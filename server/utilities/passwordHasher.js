/* eslint class-methods-use-this:0  */
import bcrypt from 'bcryptjs';

/**
 * This function hashes the password
 * @param { string } inputPassword
 * @returns {string } hashed password using bcrypt hashing.
 */
const hash = (inputPassword) => {
  return bcrypt.hashSync(inputPassword, 8);
};

/**
 * This function compares a hashed password and normal test.
 * @param { string } inputPassword
 * @param { string } databasePassword
 * @returns { boolean } true if passwords match, false if otherwise.
 */
const compare = (inputPassword, databasePassword) => {
  return bcrypt.compareSync(inputPassword, databasePassword);
};

const passwordUtil = { hash, compare };

export default passwordUtil;
