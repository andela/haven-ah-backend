import { Router } from 'express';
import User from '../controllers/user';
import inputValidator from '../middlewares/validations';

const router = new Router();

router.post('/users/signup', inputValidator.signupValidator, User.signup);
router.post('/users/signin', inputValidator.signinValidator, User.signin);

export default router;
