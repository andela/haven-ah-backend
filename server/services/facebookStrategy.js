import passport from 'passport';
import {
  Strategy as FacebookStrategy
} from 'passport-facebook';
import dotenv from 'dotenv';
import socialConfig from '../config/socialConfig';
import { getUrl } from '../utilities/currentEnv';
import passportAuthenticator from '../utilities/passportAuthentication';
import socialCallback from './socialCallback';

dotenv.config();

passport.use(new FacebookStrategy({
  clientID: socialConfig.facebook.clientID,
  clientSecret: socialConfig.facebook.clientSecret,
  callbackURL: `${getUrl}${socialConfig.facebook.callbackURL}`,
  profileFields: ['id', 'emails', 'name', 'picture.type(large)']
}, socialCallback));


const facebookRoutes = passportAuthenticator('facebook');
export default facebookRoutes;
