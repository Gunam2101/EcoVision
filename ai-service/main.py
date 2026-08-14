import os
import sys
import json
import base64
from fastapi import FastAPI, UploadFile, File, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from model import detector_engine

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding='utf-8')
        sys.stderr.reconfigure(encoding='utf-8')
    except Exception:
        pass

app = FastAPI(
    title="EcoVision AI Microservice",
    description="FastAPI + YOLOv11 Engine for Real-Time Waste Detection",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ImageDetectionPayload(BaseModel):
    image: str # Base64 encoded image string
    confidenceThreshold: Optional[float] = 0.15

@app.get("/")
def read_root():
    return {
        "service": "EcoVision AI Microservice",
        "status": "ONLINE",
        "engine": "Ultralytics YOLOv11 Engine",
        "endpoints": ["/health", "/detect", "/upload-image", "/live-detection"]
    }

@app.get("/health")
def health_check():
    return {
        "status": "UP",
        "gpuAvailable": False,
        "modelLoaded": detector_engine.model is not None,
    }

@app.post("/detect")
def detect_objects_base64(payload: ImageDetectionPayload):
    try:
        objects, metrics, _ = detector_engine.process_base64_image(payload.image)
        return {
            "success": True,
            "metrics": metrics,
            "objectsCount": len(objects),
            "objects": objects
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Image processing error: {str(e)}")

@app.post("/upload-image")
async def detect_uploaded_file(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        base64_str = base64.b64encode(contents).decode('utf-8')
        objects, metrics, _ = detector_engine.process_base64_image(base64_str)
        return {
            "success": True,
            "filename": file.filename,
            "metrics": metrics,
            "objectsCount": len(objects),
            "objects": objects
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"File read error: {str(e)}")

@app.websocket("/live-detection")
async def websocket_live_detection(websocket: WebSocket):
    await websocket.accept()
    print("🔌 Live Camera WebSocket client connected")
    try:
        while True:
            data = await websocket.receive_text()
            try:
                payload = json.loads(data)
                image_base64 = payload.get("image")
            except:
                image_base64 = data

            if image_base64:
                objects, metrics, _ = detector_engine.process_base64_image(image_base64)
                await websocket.send_json({
                    "success": True,
                    "metrics": metrics,
                    "objects": objects,
                    "timestamp": payload.get("timestamp") if isinstance(payload, dict) else None
                })
    except WebSocketDisconnect:
        print("🔌 Live Camera WebSocket client disconnected")
    except Exception as e:
        print(f"⚠️ WebSocket error: {e}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
