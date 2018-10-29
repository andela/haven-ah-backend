/* eslint arrow-body-style: 0 */
import bcrypt from 'bcryptjs';

/**
 * This function hashes the password
 * @param { string } inputPassword
 * @returns {string } hashed password using bcrypt hashing.
 * @example hash('password123')
 */
const hash = inputPassword => bcrypt.hashSync(inputPassword, 8);

/**
 * This function compares a hashed password and normal
 * @param { string } inputPassword
 * @param { string } databasePassword
 * @returns { boolean } true if passwords match, false if otherwise.
 */
const compare = (inputPassword, databasePassword) => {
  return bcrypt.compareSync(inputPassword, databasePassword);
};

const passwordUtil = { hash, compare };

export default passwordUtil;
