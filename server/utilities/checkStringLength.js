/**
 * This method checks the string length against the supplied length.
 * @param {string} stringInput
 * @param {integer} requiredLength
 * @returns {boolean || string} returns true or false, or error message
 * @example checkStringLen('uche', 5) returns true.
 */

const checkStringLen = (stringInput, requiredLength) => {
  if (typeof stringInput !== 'string') {
    return 'stringInput argument must be a string';
  }
  if (typeof requiredLength !== 'number') {
    return 'RequireLength argument must be a number';
  }
  return stringInput.trim().length <= requiredLength;
};

export default checkStringLen;
