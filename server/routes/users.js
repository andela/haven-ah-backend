import { Router } from 'express';
import User from '../controllers/user';
import inputValidator from '../middlewares/validations';
import checkAuth from '../middlewares/checkAuth';

const router = new Router();

router.post('/users/signup', inputValidator.signupValidator, User.signup);
router.post('/users/signin', inputValidator.signinValidator, User.signin);
router.get('/users', checkAuth, User.listAll);
router.get('/auth/confirm/:token', checkAuth, User.confirm);

export default router;
