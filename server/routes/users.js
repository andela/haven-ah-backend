import { Router } from 'express';
import User from '../controllers/user';
import inputValidator from '../middlewares/validations';

const router = new Router();

router.post('/users/signup', inputValidator, User.signup);

export default router;
