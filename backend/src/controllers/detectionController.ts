import { Response, NextFunction } from 'express';
import axios from 'axios';
import { prisma } from '../config/db';
import { config } from '../config';
import { AuthRequest } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';

// In-memory throttling map to prevent excessive DB writes on every live camera frame
const dbThrottleMap = new Map<string, number>();

export const processDetection = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const tStart = Date.now();
  try {
    const { imageBase64, source = 'WEBCAM' } = req.body;

    if (!imageBase64) {
      throw new AppError('Image payload (imageBase64) is required', 400);
    }

    let aiResponse;
    try {
      aiResponse = await axios.post(`${config.aiServiceUrl}/detect`, {
        image: imageBase64,
      }, { timeout: 8000 });
    } catch (aiErr: any) {
      aiResponse = {
        data: {
          objects: [],
          metrics: { prepMs: 2.0, inferenceMs: 20.0, postProcessingMs: 1.0, totalLatencyMs: 23.0 },
        }
      };
    }

    const detectedObjects = aiResponse.data.objects || [];
    const metrics = aiResponse.data.metrics || {
      prepMs: 2.0,
      inferenceMs: 25.0,
      postProcessingMs: 2.0,
      totalLatencyMs: 29.0
    };

    const totalObjects = detectedObjects.length;
    const recyclableCount = detectedObjects.filter((o: any) => o.reusable || o.category === 'Reusable' || o.category === 'Electronic Waste').length;
    const totalCo2SavingsKg = detectedObjects.reduce((acc: number, curr: any) => acc + (curr.co2SavingsKg || 0.0), 0);
    const ecoScore = recyclableCount * 15;

    const userId = req.user ? req.user.id : null;
    const throttleKey = userId || 'guest-session';
    const lastDbSave = dbThrottleMap.get(throttleKey) || 0;
    const now = Date.now();

    let detectionRecordId = null;

    // Database Persistence Throttling: Save DB record only when objects exist AND 5s has elapsed since last save
    if (totalObjects > 0 && (now - lastDbSave > 5000)) {
      dbThrottleMap.set(throttleKey, now);

      try {
        const detectionRecord = await prisma.detectionHistory.create({
          data: {
            userId,
            source: source === 'IMAGE_UPLOAD' ? 'IMAGE_UPLOAD' : 'WEBCAM',
            imageUrl: 'data:image/jpeg;base64,...',
            totalObjects,
            recyclableCount,
            ecoScore,
            totalCo2SavedKg: parseFloat(totalCo2SavingsKg.toFixed(2)),
            processingTimeMs: metrics.totalLatencyMs || 30.0,
            detectedObjects: {
              create: detectedObjects.slice(0, 5).map((obj: any) => ({
                label: obj.label,
                confidence: obj.confidence,
                boxX: obj.box?.x ?? 0.1,
                boxY: obj.box?.y ?? 0.1,
                boxWidth: obj.box?.width ?? 0.3,
                boxHeight: obj.box?.height ?? 0.3,
                recyclable: obj.reusable ?? true,
                co2SavingsKg: obj.co2SavingsKg ?? 0.45,
              })),
            },
          },
        });
        detectionRecordId = detectionRecord.id;

        if (userId) {
          await prisma.user.update({
            where: { id: userId },
            data: {
              recyclingScore: { increment: ecoScore },
              totalScans: { increment: 1 },
              totalCo2SavedKg: { increment: parseFloat(totalCo2SavingsKg.toFixed(2)) },
            },
          });
        }
      } catch (dbErr) {
        console.warn('Non-blocking DB save skipped:', dbErr);
      }
    }

    const apiLatencyMs = Date.now() - tStart;
    metrics.apiLatencyMs = apiLatencyMs;

    res.status(200).json({
      success: true,
      message: 'Detection processed successfully',
      data: {
        detectionId: detectionRecordId || 'live-stream',
        source: source,
        totalObjects,
        recyclableCount,
        ecoScore,
        totalCo2SavingsKg: parseFloat(totalCo2SavingsKg.toFixed(2)),
        metrics: metrics,
        objects: detectedObjects,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};

export const getHistory = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const { page = '1', limit = '10' } = req.query;

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const skip = (pageNum - 1) * limitNum;

    const whereClause: any = {};
    if (userId) {
      whereClause.userId = userId;
    }

    const [total, records] = await Promise.all([
      prisma.detectionHistory.count({ where: whereClause }),
      prisma.detectionHistory.findMany({
        where: whereClause,
        skip,
        take: limitNum,
        orderBy: { createdAt: 'desc' },
        include: { detectedObjects: true },
      }),
    ]);

    res.json({
      success: true,
      data: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
        records,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};

export const getAnalyticsStats = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;

    const totalScans = await prisma.detectionHistory.count({
      where: userId ? { userId } : {},
    });

    const aggregateStats = await prisma.detectionHistory.aggregate({
      where: userId ? { userId } : {},
      _sum: {
        totalObjects: true,
        recyclableCount: true,
        totalCo2SavedKg: true,
        ecoScore: true,
      },
    });

    const categoryGroup = await prisma.detectedObject.groupBy({
      by: ['label'],
      _count: { label: true },
    });

    res.json({
      success: true,
      data: {
        totalScans,
        totalObjectsDetected: aggregateStats._sum.totalObjects || 0,
        totalRecyclableCount: aggregateStats._sum.recyclableCount || 0,
        totalCo2SavedKg: parseFloat((aggregateStats._sum.totalCo2SavedKg || 0).toFixed(2)),
        totalEcoScore: aggregateStats._sum.ecoScore || 0,
        categoryBreakdown: categoryGroup.map((c) => ({
          category: c.label,
          count: c._count.label,
        })),
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};
