import jwt from 'jsonwebtoken';
import config from '../config/config';

const webToken = (id) => {
  const token = jwt.sign(
    { id },
    config.secret,
    { expiresIn: 604800 },
  );
  return token;
};
export default webToken;
