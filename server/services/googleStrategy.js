import passport from 'passport';
import {
  Strategy as GoogleStrategy
} from 'passport-google-oauth20';
import dotenv from 'dotenv';
import socialConfig from '../config/socialConfig';
import { getUrl } from '../utilities/currentEnv';
import passportAuthenticator from '../utilities/passportAuthentication';
import socialCallback from './socialCallback';

dotenv.config();

passport.use(new GoogleStrategy({
  clientID: socialConfig.google.clientID,
  clientSecret: socialConfig.google.clientSecret,
  callbackURL: `${getUrl}${socialConfig.google.callbackURL}`,
}, socialCallback));

const googleRoutes = passportAuthenticator('google');
export default googleRoutes;
