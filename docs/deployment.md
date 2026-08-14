# 🚀 Production Deployment & Environment Guide

This guide details step-by-step instructions for deploying EcoVision AI to production cloud infrastructure (**Vercel**, **Railway**, **Supabase**, and **Cloudinary**).

---

## 🗄️ 1. Database Setup (Supabase PostgreSQL)

1. Create a project on [Supabase.com](https://supabase.com).
2. Navigate to **Project Settings -> Database** and copy the Transaction / Direct Connection String.
3. Update `backend/.env` with your Supabase PostgreSQL URL:
   ```env
   DATABASE_URL="postgresql://postgres.[REF]:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbooster=true"
   ```
4. Run Prisma database schema migration & seed scripts:
   ```bash
   cd backend
   npx prisma db push
   npx prisma db seed
   ```

---

## ⚡ 2. Backend & AI Service Deployment (Railway)

### Express API Service
1. Create a new service on [Railway.app](https://railway.app) pointing to `/backend`.
2. Set Environment Variables:
   - `PORT=5000`
   - `DATABASE_URL` = (Supabase connection string)
   - `JWT_SECRET` = (Random 64-char hex string)
   - `AI_SERVICE_URL` = (URL of deployed Railway AI Service)
   - `CORS_ORIGIN` = (Vercel Frontend production URL)

### Python FastAPI AI Microservice
1. Create a second service on Railway pointing to `/ai-service`.
2. Configured using `docker/Dockerfile.ai-service` or Railway Python runtime.
3. Verify `/health` endpoint responds with HTTP 200.

---

## 🌐 3. Frontend Deployment (Vercel)

1. Connect repository to [Vercel](https://vercel.com).
2. Set Root Directory to `frontend`.
3. Add Environment Variables:
   - `NEXT_PUBLIC_API_URL` = `https://your-backend.up.railway.app`
   - `NEXT_PUBLIC_AI_URL` = `https://your-ai-service.up.railway.app`
4. Deploy! Next.js 15 App Router will automatically build and publish to Vercel global CDN.
