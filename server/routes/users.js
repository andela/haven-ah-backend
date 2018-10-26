import { Router } from 'express';
import User from '../controllers/user';

const router = new Router();

router.post('/api/v1/user/signup', User.signup);

export default router;
