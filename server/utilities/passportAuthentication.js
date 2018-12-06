import passport from 'passport';

export default (socialMediaName) => {
  /**
 * Authenticates the url.
 * @returns {function} authenticate
 */
  const authenticate = () => passport.authenticate(socialMediaName, { scope: ['email'] });

  /**
 * Redirects the url to the home page .
 * @returns {function} callback
 */
  const callback = () => passport.authenticate(socialMediaName, { failureRedirect: '/' });

  return {
    authenticate,
    callback,
  };
};
