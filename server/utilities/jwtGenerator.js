import jwt from 'jsonwebtoken';
import config from '../config/config';

const env = process.env.NODE_ENV || 'development';
/**
 * Generates token for user authentiation and authorization
 * @param {UUID} id User Id
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
