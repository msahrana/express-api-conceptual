import { Router } from 'express';
import { createOrder, getAllOrders } from '../controllers/order.controller';
import { auth, authorizeRoles } from '../../middleware/auth';

const router = Router();

router.post('/', auth, authorizeRoles('admin'), createOrder);
router.get('/all', auth, authorizeRoles('super_admin'), getAllOrders);

export default router;
