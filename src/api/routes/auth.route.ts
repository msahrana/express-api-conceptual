import { Router } from 'express';
import {
    deleteAllUser,
    deleteUser,
    getAllUser,
    getCurrentUser,
    login,
    logout,
    refresh,
    signup,
    updateUser,
} from '../controllers/auth.controller';
import { auth, authorizeRoles } from '../../middleware/auth';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', getCurrentUser);
router.get('/refresh', refresh);
router.put('/update/:id', auth, updateUser);
router.delete('/delete/:id', auth, deleteUser);

router.get('/all/users', authorizeRoles('admin'), getAllUser);
router.get('/delete/all', authorizeRoles('super_admin'), deleteAllUser);

router.post('/logout', logout); // NB: [Does not working]

export default router;
