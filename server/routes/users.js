import { Router } from 'express';
import User from '../controllers/user';

const router = new Router();

router.post('/user/signup', User.signup);

export default router;
