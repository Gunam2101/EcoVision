import { Response, NextFunction } from 'express';
import { prisma } from '../config/db';
import { AuthRequest } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';
import { dispatchNotification } from './notificationController';

export const autoGenerateSessionReport = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const { sessionId, sessionObjects = [], totalCo2SavedKg = 0.0 } = req.body;

    const reportTitle = `Live Detection Session Report - ${new Date().toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}`;
    const objectCount = sessionObjects.length;

    // Create Report Record in PostgreSQL
    let reportRecord = null;
    if (userId) {
      reportRecord = await prisma.report.create({
        data: {
          userId,
          title: reportTitle,
          reportType: 'SESSION_AUDIT',
          status: 'COMPLETED',
          fileUrl: `/reports/download/${sessionId || Date.now()}`,
        },
      });

      // Dispatch Real-Time Notification
      await dispatchNotification(
        userId,
        'Report Generated',
        `Your live camera detection session report (${objectCount} items classified, +${totalCo2SavedKg.toFixed(2)} kg CO₂ saved) was automatically generated and saved.`,
        'SUCCESS'
      );
    }

    res.status(201).json({
      success: true,
      message: 'Detection session report automatically generated and saved',
      data: {
        reportId: reportRecord ? reportRecord.id : `rep-${Date.now()}`,
        title: reportTitle,
        totalObjects: objectCount,
        totalCo2SavedKg: parseFloat(totalCo2SavedKg.toFixed(2)),
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getReports = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const { page = '1', limit = '10' } = req.query;

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const skip = (pageNum - 1) * limitNum;

    const whereClause: any = userId ? { userId } : {};

    const [total, reports] = await Promise.all([
      prisma.report.count({ where: whereClause }),
      prisma.report.findMany({
        where: whereClause,
        skip,
        take: limitNum,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    res.json({
      success: true,
      data: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
        reports,
      },
    });
  } catch (error) {
    next(error);
  }
};
