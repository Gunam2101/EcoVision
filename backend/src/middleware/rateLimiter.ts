import rateLimit from 'express-rate-limit';

export const globalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100000, // High limit for continuous streaming video detection
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => req.path.includes('/detection/detect'),
  message: {
    success: false,
    error: 'Too many requests from this IP, please try again later.',
    timestamp: new Date().toISOString(),
  },
});

export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many authentication attempts, please try again later.',
    timestamp: new Date().toISOString(),
  },
});
