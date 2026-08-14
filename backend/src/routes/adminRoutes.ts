import { Router } from 'express';
import { getAllUsers, updateUserRole, getSystemLogs, getSettings } from '../controllers/adminController';
import { authenticateJwt, requireRoles } from '../middleware/auth';

const router = Router();

// Protect all admin endpoints
router.use(authenticateJwt, requireRoles(['ADMIN']));

router.get('/users', getAllUsers);
router.patch('/users/:userId/role', updateUserRole);
router.get('/logs', getSystemLogs);
router.get('/settings', getSettings);

export default router;
