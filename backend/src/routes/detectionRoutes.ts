import { Router } from 'express';
import { processDetection, getHistory, getAnalyticsStats } from '../controllers/detectionController';
import { authenticateJwt } from '../middleware/auth';

const router = Router();

// Guest & Authenticated support
router.post('/detect', processDetection);
router.get('/history', authenticateJwt, getHistory);
router.get('/stats', getAnalyticsStats);

export default router;
