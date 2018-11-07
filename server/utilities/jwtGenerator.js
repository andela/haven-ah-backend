import jwt from 'jsonwebtoken';
import config from '../config/config';
import { getCurrentEnv } from './currentEnv';

const env = getCurrentEnv();
/**
 * Generates token for user authentiation and authorization
 * @param {id} id User Id
 * @returns {string} User Token
 */
const createToken = (id) => {
  const token = jwt.sign(
    { id },
    config[env].secret,
    { expiresIn: 604800 },
  );
  return token;
};
export default createToken;
