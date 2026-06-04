import { Router } from 'express';
import {
    getCurrentUser,
    login,
    refresh,
    signup,
    updateUser,
} from '../controllers/auth.controller';
import { auth } from '../../middleware/auth';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', getCurrentUser);
router.get('/refresh', refresh);
router.put('/update/:id', auth, updateUser);
// router.delete('/delete/:id');

export default router;
