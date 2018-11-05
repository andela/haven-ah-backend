import { Router } from 'express';
import User from '../controllers/user';
import inputValidator from '../middlewares/validations';
import isAuthenticated from '../middlewares/checkAuth';
import isAuthorized from '../middlewares/authorization';
import uploadImage from '../middlewares/uploadImage';

import validator from '../middlewares/paramChecker';

const router = new Router();

router.post('/users/signup', inputValidator.signupValidator, User.signup);
router.post('/users/signin', inputValidator.signinValidator, User.signin);

router.get('/auth/confirm/:token', isAuthenticated, User.confirm);
router.get('/users', isAuthenticated, User.listAll);
router.post('/users/resetpassword', User.resetPassword);
router.get('/users/resetpassword/:token', isAuthenticated, User.confirmPassword);
router.post('/users/updatepassword', isAuthenticated, User.updatePassword);
router.get('/users/:username', isAuthenticated, isAuthorized, User.profile);
router.put('/users/:username', isAuthenticated, inputValidator.editProfile, isAuthorized,
  uploadImage, User.editProfile);

router.post('/profiles/:username/follow', isAuthenticated, validator.validateUsername, User.follow);
router.delete('/profiles/:username/follow', isAuthenticated, validator.validateUsername, User.unfollow);

export default router;
