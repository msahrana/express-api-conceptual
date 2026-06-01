import { Router } from 'express';
import { login, refresh, signup } from '../controllers/auth.controller';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
// router.post('/logout');
// router.get('/me');
router.get('/refresh', refresh);
// router.put('/update/:id');
// router.delete('/delete/:id');

export default router;
