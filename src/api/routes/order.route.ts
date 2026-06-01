import { Router } from 'express';
import { createOrder } from '../controllers/order.controller';
import { auth, authorizeRoles } from '../../middleware/auth';

const router = Router();

router.post('/', auth, authorizeRoles('admin'), createOrder);

export default router;
