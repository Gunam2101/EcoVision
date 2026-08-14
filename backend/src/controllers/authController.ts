import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { prisma } from '../config/db';
import { config } from '../config';
import { AppError } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth';
import { dispatchNotification } from './notificationController';

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  fullName: z.string().min(2, 'Full name is required'),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

const generateTokens = (user: { id: string; email: string; role: string }) => {
  const accessToken = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    config.jwtSecret,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { id: user.id },
    config.refreshTokenSecret,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
};

// Helper for Security Compliance: Log Login Audit (NEVER store plain-text password)
const logAudit = async (email: string, action: string, ipAddress?: string, userAgent?: string, metadata?: any, userId?: string) => {
  try {
    await prisma.activityLog.create({
      data: {
        userId: userId || null,
        action,
        ipAddress: ipAddress || '127.0.0.1',
        userAgent: userAgent || 'Unknown',
        metadata: metadata ? metadata : { email },
      },
    });
  } catch (e) {
    console.warn('Audit log write warning:', e);
  }
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = registerSchema.parse(req.body);
    const lowerEmail = parsed.email.toLowerCase();

    const existingUser = await prisma.user.findUnique({
      where: { email: lowerEmail },
    });

    if (existingUser) {
      await logAudit(lowerEmail, 'REGISTER_FAILED', req.ip, req.headers['user-agent'], { reason: 'Email already exists' });
      throw new AppError('User with this email already exists', 400);
    }

    const defaultRole = await prisma.role.findUnique({
      where: { name: 'USER' },
    });

    if (!defaultRole) {
      throw new AppError('Default role system not initialized', 500);
    }

    const passwordHash = await bcrypt.hash(parsed.password, 10);

    const newUser = await prisma.user.create({
      data: {
        email: lowerEmail,
        passwordHash,
        fullName: parsed.fullName,
        roleId: defaultRole.id,
        isVerified: true,
      },
      include: { role: true },
    });

    await logAudit(lowerEmail, 'REGISTER_SUCCESS', req.ip, req.headers['user-agent'], { email: lowerEmail }, newUser.id);
    await dispatchNotification(newUser.id, 'Account Created', 'Welcome to EcoVision AI! Your account has been created successfully.', 'SUCCESS');

    const tokens = generateTokens({
      id: newUser.id,
      email: newUser.email,
      role: newUser.role.name,
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: newUser.id,
          email: newUser.email,
          fullName: newUser.fullName,
          role: newUser.role.name,
          recyclingScore: newUser.recyclingScore,
        },
        ...tokens,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: error.errors.map((e) => e.message).join(', '),
        timestamp: new Date().toISOString(),
      });
    }
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const ipAddress = req.ip || '127.0.0.1';
  const userAgent = (req.headers['user-agent'] as string) || 'Unknown';
  let attemptEmail = '';

  try {
    const parsed = loginSchema.parse(req.body);
    attemptEmail = parsed.email.toLowerCase();

    const user = await prisma.user.findUnique({
      where: { email: attemptEmail },
      include: { role: true },
    });

    if (!user) {
      await logAudit(attemptEmail, 'LOGIN_FAILED', ipAddress, userAgent, { email: attemptEmail, reason: 'Unknown email address' });
      throw new AppError('Invalid email or password credentials', 401);
    }

    const isMatch = await bcrypt.compare(parsed.password, user.passwordHash);
    if (!isMatch) {
      await logAudit(attemptEmail, 'LOGIN_FAILED', ipAddress, userAgent, { email: attemptEmail, reason: 'Incorrect password' }, user.id);
      throw new AppError('Invalid email or password credentials', 401);
    }

    const tokens = generateTokens({
      id: user.id,
      email: user.email,
      role: user.role.name,
    });

    const refreshTokenHash = await bcrypt.hash(tokens.refreshToken, 10);
    await prisma.session.create({
      data: {
        userId: user.id,
        refreshTokenHash,
        userAgent,
        ipAddress,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    await logAudit(attemptEmail, 'LOGIN_SUCCESS', ipAddress, userAgent, { email: attemptEmail }, user.id);
    await dispatchNotification(user.id, 'Successful Login', `Logged in successfully from IP ${ipAddress}.`, 'INFO');

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          avatarUrl: user.avatarUrl,
          role: user.role.name,
          recyclingScore: user.recyclingScore,
          totalScans: user.totalScans,
          totalCo2SavedKg: user.totalCo2SavedKg,
        },
        ...tokens,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: error.errors.map((e) => e.message).join(', '),
        timestamp: new Date().toISOString(),
      });
    }
    next(error);
  }
};

// Module 6: Google OAuth Authentication Handler
export const googleLogin = async (req: Request, res: Response, next: NextFunction) => {
  const ipAddress = req.ip || '127.0.0.1';
  const userAgent = (req.headers['user-agent'] as string) || 'Unknown';

  try {
    const { email, fullName, avatarUrl, googleId } = req.body;

    if (!email) {
      throw new AppError('Google email is required', 400);
    }

    const lowerEmail = email.toLowerCase();
    const defaultRole = await prisma.role.findUnique({ where: { name: 'USER' } });
    if (!defaultRole) throw new AppError('Role configuration error', 500);

    let user = await prisma.user.findUnique({
      where: { email: lowerEmail },
      include: { role: true },
    });

    if (!user) {
      // Create user in PostgreSQL database
      const randomPasswordHash = await bcrypt.hash(`google-oauth-${Date.now()}`, 10);
      user = await prisma.user.create({
        data: {
          email: lowerEmail,
          fullName: fullName || 'Google User',
          avatarUrl: avatarUrl || null,
          passwordHash: randomPasswordHash,
          roleId: defaultRole.id,
          isVerified: true,
        },
        include: { role: true },
      });
    } else if (avatarUrl || fullName) {
      // Update profile info
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          avatarUrl: avatarUrl || user.avatarUrl,
          fullName: fullName || user.fullName,
        },
        include: { role: true },
      });
    }

    const tokens = generateTokens({
      id: user.id,
      email: user.email,
      role: user.role.name,
    });

    await logAudit(lowerEmail, 'GOOGLE_LOGIN_SUCCESS', ipAddress, userAgent, { email: lowerEmail, googleId }, user.id);
    await dispatchNotification(user.id, 'Google Sign-In Successful', `Authenticated via Google OAuth (${lowerEmail}).`, 'SUCCESS');

    res.json({
      success: true,
      message: 'Google Sign-In successful',
      data: {
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          avatarUrl: user.avatarUrl,
          role: user.role.name,
          recyclingScore: user.recyclingScore,
          totalScans: user.totalScans,
          totalCo2SavedKg: user.totalCo2SavedKg,
        },
        ...tokens,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new AppError('Unauthorized', 401);
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: { role: true },
    });

    if (!user) {
      throw new AppError('User profile not found', 404);
    }

    res.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        avatarUrl: user.avatarUrl,
        role: user.role.name,
        recyclingScore: user.recyclingScore,
        totalScans: user.totalScans,
        totalCo2SavedKg: user.totalCo2SavedKg,
        createdAt: user.createdAt,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};
