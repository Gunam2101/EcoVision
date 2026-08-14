import os
import sys
import time
import base64
import io
import json
import cv2
import numpy as np
from PIL import Image
from typing import List, Dict, Any, Tuple

# Ensure stdout/stderr handles UTF-8 on Windows
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding='utf-8')
        sys.stderr.reconfigure(encoding='utf-8')
    except Exception:
        pass

CATEGORY_COLOR_MAP = {
    'Reusable': '#22C55E',
    'Non-Reusable': '#EF4444',
    'Hazardous': '#F97316',
    'Electronic Waste': '#A855F7',
    'Organic': '#B45309',
    'Organic Waste': '#B45309',
    'Unknown': '#6B7280'
}

# ByteTrack / IOU Object Tracker for Frame Stabilization
class IOUObjectTracker:
    def __init__(self, iou_threshold: float = 0.30, max_age: int = 6):
        self.iou_threshold = iou_threshold
        self.max_age = max_age
        self.next_id = 1
        self.tracks = {}

    def _compute_iou(self, boxA: Dict[str, float], boxB: Dict[str, float]) -> float:
        xA = max(boxA['x'], boxB['x'])
        yA = max(boxA['y'], boxB['y'])
        xB = min(boxA['x'] + boxA['width'], boxB['x'] + boxB['width'])
        yB = min(boxA['y'] + boxA['height'], boxB['y'] + boxB['height'])

        interArea = max(0.0, xB - xA) * max(0.0, yB - yA)
        boxAArea = boxA['width'] * boxA['height']
        boxBArea = boxB['width'] * boxB['height']

        denominator = float(boxAArea + boxBArea - interArea)
        if denominator == 0:
            return 0.0
        return interArea / denominator

    def update(self, detections: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        for tid in list(self.tracks.keys()):
            self.tracks[tid]['age'] += 1
            if self.tracks[tid]['age'] > self.max_age:
                del self.tracks[tid]

        updated_detections = []

        for det in detections:
            box = det['box']
            best_iou = 0.0
            best_tid = None

            for tid, trk in self.tracks.items():
                if trk['label'] == det['label']:
                    iou = self._compute_iou(box, trk['box'])
                    if iou > best_iou and iou >= self.iou_threshold:
                        best_iou = iou
                        best_tid = tid

            if best_tid is None:
                best_tid = self.next_id
                self.next_id += 1

            self.tracks[best_tid] = {
                'box': box,
                'label': det['label'],
                'age': 0,
            }

            det_copy = dict(det)
            det_copy['id'] = best_tid
            det_copy['trackingId'] = best_tid
            updated_detections.append(det_copy)

        return updated_detections

class WasteDetectorEngine:
    def __init__(self, model_name: str = "yolo11s.pt"):
        self.model_name = model_name
        self.model = None
        self.tracker = IOUObjectTracker()
        self.rules = {}
        self._load_classification_rules()
        self._initialize_model()

    def _load_classification_rules(self):
        rules_path = os.path.join(os.path.dirname(__file__), 'classification_rules.json')
        if os.path.exists(rules_path):
            try:
                with open(rules_path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    self.rules = data.get('rules', {})
                    print(f"[RULES] Loaded {len(self.rules)} classification rules from JSON.")
            except Exception as e:
                print(f"[ERROR] Error loading rules JSON: {e}")

    def _initialize_model(self):
        models_to_try = [self.model_name, "yolo11n.pt", "yolov8s.pt", "yolov8n.pt"]
        for m_name in models_to_try:
            try:
                from ultralytics import YOLO
                print(f"[MODEL] Loading Persistent YOLO AI Model ({m_name}) into memory...")
                self.model = YOLO(m_name)
                # Warm-up run to initialize PyTorch tensors in memory
                dummy = np.zeros((640, 640, 3), dtype=np.uint8)
                self.model(dummy, conf=0.15, imgsz=640, verbose=False)
                print(f"[SUCCESS] Warm-up complete! Persistent YOLO Model ({m_name}) ready!")
                break
            except Exception as e:
                print(f"[WARNING] Could not load {m_name}: {e}")

    def process_base64_image(self, base64_str: str) -> Tuple[List[Dict[str, Any]], Dict[str, float], str]:
        t_start = time.time()

        if "," in base64_str:
            base64_str = base64_str.split(",")[1]

        t_prep_start = time.time()
        image_bytes = base64.b64decode(base64_str)
        nparr = np.frombuffer(image_bytes, np.uint8)
        img_np = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        if img_np is None:
            pil_image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
            img_np = cv2.cvtColor(np.array(pil_image), cv2.COLOR_RGB2BGR)

        h, w, _ = img_np.shape
        prep_ms = round((time.time() - t_prep_start) * 1000, 2)

        raw_detections = []
        t_infer_start = time.time()

        if self.model is not None:
            results = self.model(img_np, conf=0.15, imgsz=640, verbose=False)
            infer_ms = round((time.time() - t_infer_start) * 1000, 2)

            t_post_start = time.time()
            for r in results:
                for box in r.boxes:
                    cls_id = int(box.cls[0])
                    raw_name = self.model.names[cls_id].lower()
                    raw_conf = float(box.conf[0])

                    if raw_name == 'person':
                        continue

                    xyxy = box.xyxy[0].cpu().numpy()
                    x1, y1, x2, y2 = xyxy

                    pixel_bbox = {
                        "x1": int(round(x1)),
                        "y1": int(round(y1)),
                        "x2": int(round(x2)),
                        "y2": int(round(y2))
                    }

                    norm_box = {
                        "x": round(float(x1 / w), 4),
                        "y": round(float(y1 / h), 4),
                        "width": round(float((x2 - x1) / w), 4),
                        "height": round(float((y2 - y1) / h), 4)
                    }

                    if raw_conf < 0.20 or raw_name not in self.rules:
                        category_name = 'Unknown'
                        rule = {
                            'name': raw_name.capitalize(),
                            'category': 'Unknown',
                            'reusable': False,
                            'co2SavingsKg': 0.00
                        }
                    else:
                        rule = self.rules[raw_name]
                        category_name = rule['category']

                    hex_color = CATEGORY_COLOR_MAP.get(category_name, '#6B7280')

                    raw_detections.append({
                        "class": raw_name,
                        "label": rule['name'],
                        "rawLabel": raw_name,
                        "category": category_name,
                        "classification": category_name.upper().replace('-', '_').replace(' ', '_'),
                        "reusable": rule['reusable'],
                        "confidence": round(raw_conf, 4),
                        "color": hex_color,
                        "bbox": pixel_bbox,
                        "box": norm_box,
                        "co2SavingsKg": rule.get('co2SavingsKg', 0.00),
                    })
        else:
            infer_ms = 0.0
            t_post_start = time.time()

        tracked_objects = self.tracker.update(raw_detections)
        post_ms = round((time.time() - t_post_start) * 1000, 2)
        total_ms = round((time.time() - t_start) * 1000, 2)

        metrics = {
            "prepMs": prep_ms,
            "inferenceMs": infer_ms,
            "postProcessingMs": post_ms,
            "totalLatencyMs": total_ms
        }

        return tracked_objects, metrics, base64_str

detector_engine = WasteDetectorEngine()
