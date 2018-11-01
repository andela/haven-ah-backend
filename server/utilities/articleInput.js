/**
 * This function validates a request object
 * @param {*} requestObject
 * @param {(string)} requiredFieldObject
 * @returns {string[]} result
 * @example
 * validateArticleFields({
 * title: 'vanity',
 * body: 'vanity is vanity'
 * }, ['title', 'body'])
 */
const validateArticleFields = (requestObject, requiredFieldObject) => {
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
  return output;
};

export default validateArticleFields;
