# 🚀 EcoVision AI — Smart Waste Detection & Smart Recycling Platform

> **AI-Powered Real-Time Multi-Class Waste Classification, Bounding Box Segmentation & Carbon Offset Analytics Platform**

---

## 🌟 Executive Summary

**EcoVision AI** is a commercial-grade, enterprise microservices platform built for smart cities and recycling facilities. It uses edge-optimized **Ultralytics YOLOv11** object detection to classify waste items from live WebRTC video streams and uploaded batch images into recyclable categories (Plastic, Glass, Metal, Paper, Organic, Trash), calculates carbon offsets (kg CO₂ saved), and logs compliance data into PostgreSQL.

---

## 📐 Microservices Architecture

```
                          [ Client Browsers / Mobile ]
                                       │
                                       ▼
                     [ Next.js 15 Frontend (Port 3000) ]
                                       │
                    ┌──────────────────┴──────────────────┐
                    ▼                                     ▼
      [ Express REST API (Port 5000) ]           [ FastAPI AI Service (Port 8000) ]
                    │                                     │
                    ▼                                     ▼
        [ PostgreSQL Database ]                      [ YOLOv11 Model Engine ]
```

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: TailwindCSS 3.4, Dark Mode, Custom Glassmorphism System
- **Animation & Charts**: Framer Motion, Recharts
- **Icons & Data Fetching**: Lucide Icons, Axios, React Query

### Express Backend API
- **Runtime**: Node.js, Express, TypeScript
- **Database & ORM**: PostgreSQL, Prisma ORM (v5)
- **Security & Infrastructure**: JWT Authentication, Refresh Tokens, RBAC, Helmet, Rate Limiter, Morgan

### AI Microservice
- **Framework**: Python 3.11, FastAPI, WebSockets
- **Computer Vision**: Ultralytics YOLOv11, OpenCV, NumPy, Pillow

### Containerization & Deployment
- **Containerization**: Multi-stage Dockerfiles, Docker Compose
- **Cloud Infrastructure**: Vercel (Frontend), Railway (API & AI Service), Supabase (PostgreSQL)

---

## 📂 Repository Directory Layout

```
EcoVision/
├── frontend/                # Next.js 15 App Router Frontend (Port 3000)
│   ├── src/
│   │   ├── app/             # Pages (Landing, Dashboard, Detection, History, Admin)
│   │   ├── components/      # Glassmorphic UI Components & Layouts
│   │   └── globals.css      # Custom Tailwind tokens & animations
├── backend/                 # Node.js Express TypeScript API (Port 5000)
│   ├── prisma/              # Prisma schema & database seed script
│   └── src/                 # Controllers, Middleware (JWT/RBAC), Routes, App
├── ai-service/              # Python FastAPI + YOLOv11 Microservice (Port 8000)
│   ├── main.py              # REST & WebSocket live stream routes
│   └── model.py             # YOLO Inference pipeline & CO₂ calculator
├── database/                # Relational DDL DDL Schema & DML Seeds
├── docker/                  # Dockerfiles & docker-compose.yml
├── docs/                    # Architecture diagrams & Deployment guides
├── shared/                  # Shared TypeScript types & constants
└── scripts/                 # Bootstrap & environment setup scripts
```

---

## ⚡ Quick Start & Local Execution

### Method 1: Docker Compose (Recommended)

Run all 4 containers (Frontend, Express API, FastAPI AI Service, PostgreSQL DB) with one command:

```bash
docker-compose -f docker/docker-compose.yml up --build
```

Access services at:
- **Frontend App**: `http://localhost:3000`
- **Express API Health**: `http://localhost:5000/health`
- **FastAPI AI Service**: `http://localhost:8000`

---

### Method 2: Manual Local Microservices Setup

#### Step 1: Database Initialization
```bash
cd backend
npm install
npx prisma db push
npm run db:seed
```

#### Step 2: Start Express API Service
```bash
npm run dev
```

#### Step 3: Start Python FastAPI AI Service
```bash
cd ../ai-service
pip install -r requirements.txt
python main.py
```

#### Step 4: Start Next.js 15 Frontend
```bash
cd ../frontend
npm install
npm run dev
```

---

## 🔑 Key API Endpoints

| Service | Method | Endpoint | Description |
|---|---|---|---|
| **Backend** | `POST` | `/api/v1/auth/register` | User signup |
| **Backend** | `POST` | `/api/v1/auth/login` | JWT Login & Session |
| **Backend** | `POST` | `/api/v1/detection/detect` | Relay image to AI & log results |
| **Backend** | `GET` | `/api/v1/detection/history` | Paginated detection logs |
| **AI Service** | `POST` | `/detect` | YOLOv11 base64 object detection |
| **AI Service** | `WS` | `/live-detection` | Real-time video frame WebSocket |

---

## 📜 License & Accreditation

Engineered for **EcoVision AI** Hackathon 2026. Built with precision using modern web microservices architecture.
