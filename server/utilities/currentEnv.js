/**
 * Gets the current environment.
 * @returns {string} environment
 */
export const getCurrentEnv = () => process.env.NODE_ENV || 'development';

/**
 * Gets the app url based on the current environment
 */
export const getUrl = getCurrentEnv() === 'production'
  ? 'https://haven-ah-backend.herokuapp.com/api/v1'
  : 'http://localhost:5000/api/v1';
