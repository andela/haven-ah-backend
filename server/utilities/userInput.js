/**
 * Validation for a username
 * @param {string} username
 * @returns {boolean} result
 * @example
 * validateUsername('jigsaw')
 */
const validateUsername = (username) => {
  const usernamePattern = /^[a-zA-Z]+[a-zA-Z0-9_]+$/;
  return usernamePattern.test(username);
};

/**
 * Validation for a email
 * @param {string} email
 * @returns {boolean} result
 * @example
 * validateEmail('jigsaw@nodehero.com')
 */
const validateEmail = (email) => {
  const emailPattern = /^[a-zA-Z0-9]+[-_.]*[a-zA-Z0-9]*@[a-zA-Z0-9]+\.(?:[a-zA-Z0-9]+)*$/;
  return emailPattern.test(email);
};

/**
 * Validation for a password
 * @param {string} password
 * @returns {boolean} result
 * @example
 * validatePassword('jiggy')
 */
const validatePassword = (password) => {
  const passwordPattern = /^[0-9a-zA-Z]+$/;
  return passwordPattern.test(password);
};

/**
 * Validation for a password
 * @param {string} url
 * @returns {boolean} result
 * @example validateUrl('jiggy.jpg')
 * Insight from (jfriend00, StackOverflow.com/questions/9714525/javascript-image-url-verify)
 */
const validateUrl = (url) => {
  const urlPattern = /\.(jpeg|jpg|gif|png)$/;
  return urlPattern.test(url);
};

/**
 * This function valids a request object
 * @param {*} requestObject
 * @param {(string)} requiredFieldObject
 * @returns {string[]} result
 * @example
 * checkMissigFields({name: 'jigsaw', sex: 'm'}, ['name', 'sex'])
 */
const checkMissingFields = (requestObject, requiredFieldObject) => {
  const output = {
    isValid: true,
    problem: {},
  };
  for (let i = 0; i < requiredFieldObject.length; i += 1) {
    if (requestObject[requiredFieldObject[i]] === undefined) {
      if (output.isValid === true) {
        output.problem.invalidCredentials = '';
      }
      output
        .problem
        .invalidCredentials += `The ${requiredFieldObject[i]} is empty. `;
      output.isValid = false;
    }
  }
  if (output.isValid === false) {
    return output;
  }
  if (requestObject.password.length < 8) {
    output.isValid = false;
    output
      .problem
      .passwordLength = 'The password length should be atleast 8 characters. ';
  }
  if (!validateUsername(requestObject.username)) {
    output.isValid = false;
    output
      .problem
      .username = 'The username must begin with an alphabet and may contain a number but not symbols. ';
  }
  if (!validateEmail(requestObject.email)) {
    output.isValid = false;
    output
      .problem
      .email = 'The Email provided is invalid. ';
  }
  if (!validatePassword(requestObject.password)) {
    output.isValid = false;
    output
      .problem
      .password = 'Password must not contain symbols. ';
  }
  return output;
};

export default {
  validateUsername,
  validateEmail,
  validatePassword,
  validateUrl,
  checkMissingFields,
};
