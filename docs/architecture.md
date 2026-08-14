# 🏛️ EcoVision AI Architecture & System Blueprint

## Overview

EcoVision AI is designed as an enterprise-grade, distributed microservices platform for real-time waste classification, object detection, and environmental analytics reporting.

---

## 📐 Microservices Topology

```
+-----------------------------------------------------------------------------------+
|                                 CLIENT TIER                                       |
|  +-----------------------------------------------------------------------------+  |
|  | Next.js 15 SSR/SSG App | React 19 UI | Canvas Video Overlay Engine         |  |
|  +-----------------------------------------------------------------------------+  |
+----------------------------------------+------------------------------------------+
                                         |
                       +-----------------+-----------------+
                       | HTTPS REST / WS | HTTPS REST / WS |
                       v                 v                 v
+-----------------------------------+   +-------------------------------------------+
|           BACKEND SERVICE         |   |                AI SERVICE                 |
|  Node.js + Express + TypeScript   |   |   Python 3.11 + FastAPI + Ultralytics     |
|  - JWT Authentication & RBAC      |   |   - YOLOv11 Inference Pipeline            |
|  - Rate Limiting & Helmet Sec     |   |   - OpenCV Tensor Processing              |
|  - Analytics & Audit Logging      |   |   - Realtime WebSocket Frame Pipeline     |
|  - Prisma ORM Data Access Layer   |   |                                           |
+-----------------+-----------------+   +-------------------------------------------+
                  |
                  v
+-----------------------------------+
|           DATA TIER               |
|  PostgreSQL Database              |
|  - Users, Roles, Sessions         |
|  - Detection History & Objects    |
|  - Analytics, Audit & Reports     |
+-----------------------------------+
```

---

## 🔄 Core User Workflows

### 1. Live Camera / Image Upload Detection Flow

1. **User Client** captures frame from WebRTC webcam feed or uploads an image file.
2. **Client Component** submits payload to Python FastAPI `/detect` or `/live-detection` endpoint via HTTP multipart upload or binary WebSocket frames.
3. **AI Service** executes YOLOv11 object classification model, calculates normalized bounding box coordinates \([x, y, w, h]\), computes class confidence score \(\in [0, 1]\), and assigns waste category metrics.
4. **FastAPI AI Service** returns formatted object list back to client UI for instant canvas bounding box rendering.
5. **Client UI** posts detection result metadata payload to Express API `/api/v1/detection/history`.
6. **Express API** validates user authentication JWT token, writes record to PostgreSQL via Prisma ORM, and updates user gamification recycling points & \(CO_2\) savings statistics.

---

## 🔒 Security Architecture

- **Stateless JWT Authorization**: Access tokens (15m expiry) + HTTP-Only Refresh Tokens (7d expiry).
- **Role-Based Access Control (RBAC)**: `ADMIN`, `RESEARCHER`, `USER`.
- **API Defense**: Helmet headers, Rate limiting (100 reqs / 15 mins per IP), CORS origin isolation, Zod input sanitization.
