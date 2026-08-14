import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';
import path from 'path';

import { config } from './config';
import { globalRateLimiter } from './middleware/rateLimiter';
import { errorHandler } from './middleware/errorHandler';

import authRoutes from './routes/authRoutes';
import detectionRoutes from './routes/detectionRoutes';
import adminRoutes from './routes/adminRoutes';
import notificationRoutes from './routes/notificationRoutes';
import reportRoutes from './routes/reportRoutes';

const app = express();

// Security & Optimization Middleware
app.use(helmet());
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(
  cors({
    origin: [config.corsOrigin, 'http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true,
  })
);

if (config.nodeEnv === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

app.use(globalRateLimiter);

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    service: 'EcoVision Express Backend API',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
  });
});

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/detection', detectionRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/notifications', notificationRoutes);
app.use('/api/v1/reports', reportRoutes);

// Swagger Documentation Mock Endpoint
app.get('/api-docs-json', (req, res) => {
  res.json({
    openapi: '3.0.0',
    info: {
      title: 'EcoVision AI REST API',
      version: '1.0.0',
      description: 'Production Microservice API for Smart Waste Detection & Smart Recycling',
    },
    paths: {
      '/health': { get: { summary: 'System health check' } },
      '/api/v1/auth/login': { post: { summary: 'User login' } },
      '/api/v1/auth/register': { post: { summary: 'User registration' } },
      '/api/v1/detection/detect': { post: { summary: 'Submit image for AI object detection' } },
      '/api/v1/notifications': { get: { summary: 'Fetch user notifications' } },
      '/api/v1/reports/auto-generate': { post: { summary: 'Auto-generate session report' } },
    },
  });
});

// Centralized Error Handling
app.use(errorHandler);

export default app;
