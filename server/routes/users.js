import { Router } from 'express';
import passport from 'passport';
import googleCallback from '../utilities/passportAuthentication';
import facebookRoutes from '../services/facebookStrategy';
import googleRoutes from '../services/googleStrategy';

import inputValidator from '../middlewares/validations';
import validator from '../middlewares/paramChecker';
import isAuthenticated from '../middlewares/checkAuth';
import isAuthorized from '../middlewares/authorization';

import uploadImage from '../middlewares/uploadImage';
import tryCatchWrapper from '../utilities/tryCatchWrapper';
import User from '../controllers/user';

const router = new Router();

router.post('/users/signup', inputValidator.signupValidator, tryCatchWrapper(User.signup));
router.post('/users/signin', inputValidator.signinValidator, tryCatchWrapper(User.signin));

router.get('/auth/confirm/:token', isAuthenticated, tryCatchWrapper(User.confirm));
router.get('/users', isAuthenticated, tryCatchWrapper(User.listAll));
router.post('/users/resetpassword', tryCatchWrapper(User.resetPassword));
router.get('/users/resetpassword/:token', isAuthenticated, tryCatchWrapper(User.confirmPassword));
router.post('/users/updatepassword', isAuthenticated, tryCatchWrapper(User.updatePassword));
router.get('/users/:username', isAuthenticated, validator.validateUsername, isAuthorized.userProfile, tryCatchWrapper(User.profile));
router.put('/users/:username', isAuthenticated, validator.validateUsername, inputValidator.editProfile, isAuthorized.userProfile,
  uploadImage, tryCatchWrapper(User.editProfile));

router.put('/users/opt/notifications/', isAuthenticated, tryCatchWrapper(User.optNotification));

router.post('/profiles/:username/follow', isAuthenticated, validator.validateUsername, tryCatchWrapper(User.follow));
router.delete('/profiles/:username/follow', isAuthenticated, validator.validateUsername, tryCatchWrapper(User.unfollow));

router.get('/auth/facebook', facebookRoutes.authenticate('facebook'));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook',
    {
      successRedirect: '/',
      failureRedirect: '/'
    }));

router.get('/auth/google',
  googleRoutes.authenticate('google', { scope: 'https://www.google.com/m8/feeds' }));

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  googleCallback);
export default router;
