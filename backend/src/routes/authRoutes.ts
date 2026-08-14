import { Router } from 'express';
import { register, login, googleLogin, getCurrentUser } from '../controllers/authController';
import { authenticateJwt } from '../middleware/auth';
import { authRateLimiter } from '../middleware/rateLimiter';

const router = Router();

router.post('/register', authRateLimiter, register);
router.post('/login', authRateLimiter, login);
router.post('/google', googleLogin);
router.get('/me', authenticateJwt, getCurrentUser);

export default router;
