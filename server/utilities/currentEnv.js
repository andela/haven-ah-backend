/**
 * Gets the current environment.
 * @returns {string} environment
 */
const getCurrentEnv = () => process.env.NODE_ENV || 'development';

export default getCurrentEnv;
