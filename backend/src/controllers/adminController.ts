import { Response, NextFunction } from 'express';
import { prisma } from '../config/db';
import { AuthRequest } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';

export const getAllUsers = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        fullName: true,
        avatarUrl: true,
        isVerified: true,
        recyclingScore: true,
        totalScans: true,
        totalCo2SavedKg: true,
        createdAt: true,
        role: {
          select: { id: true, name: true },
        },
      },
    });

    res.json({
      success: true,
      data: users,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserRole = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const { roleName } = req.body; // 'ADMIN' | 'RESEARCHER' | 'USER'

    const role = await prisma.role.findUnique({
      where: { name: roleName as any },
    });

    if (!role) {
      throw new AppError('Role not found', 404);
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { roleId: role.id },
      include: { role: true },
    });

    res.json({
      success: true,
      message: `User role updated to ${roleName}`,
      data: {
        userId: updatedUser.id,
        role: updatedUser.role.name,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};

export const getSystemLogs = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const logs = await prisma.activityLog.findMany({
      take: 50,
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { email: true, fullName: true } },
      },
    });

    res.json({
      success: true,
      data: logs,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};

export const getSettings = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const settings = await prisma.setting.findMany();
    res.json({
      success: true,
      data: settings,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};
