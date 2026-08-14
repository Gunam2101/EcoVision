import { Router } from 'express';
import { autoGenerateSessionReport, getReports } from '../controllers/reportController';
import { authenticateJwt } from '../middleware/auth';

const router = Router();

router.post('/auto-generate', authenticateJwt, autoGenerateSessionReport);
router.get('/', authenticateJwt, getReports);

export default router;
