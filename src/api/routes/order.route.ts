import { Router } from 'express';
import {
    createOrder,
    deleteAllOrder,
    deleteOrder,
    getAllOrders,
    getSingleOrder,
    updateOrder,
} from '../controllers/order.controller';
import { auth, authorizeRoles } from '../../middleware/auth';

const router = Router();

router.post('/', auth, authorizeRoles('admin'), createOrder);
router.get('/all', auth, authorizeRoles('super_admin', 'admin'), getAllOrders);
router.get('/:id', auth, authorizeRoles('super_admin'), getSingleOrder);
router.patch('/:id', auth, authorizeRoles('super_admin'), updateOrder);
router.delete('/delete-all',auth, authorizeRoles('super_admin'), deleteAllOrder);
router.delete('/:id', auth, authorizeRoles('super_admin'), deleteOrder);

export default router;
