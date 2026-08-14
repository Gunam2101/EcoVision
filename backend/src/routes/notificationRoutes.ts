import { Router } from 'express';
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} from '../controllers/notificationController';
import { authenticateJwt } from '../middleware/auth';

const router = Router();

router.get('/', authenticateJwt, getNotifications);
router.patch('/:id/read', authenticateJwt, markAsRead);
router.patch('/read-all', authenticateJwt, markAllAsRead);
router.delete('/:id', authenticateJwt, deleteNotification);

export default router;
