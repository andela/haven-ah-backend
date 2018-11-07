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

  /**
   * Regdirects the url to the home page
   * @param {object} request Request Object
   * @param {object} response Response Object
   * @returns {url} redirects to home page
   */
  const googleCallback = (request, response) => {
    response.redirect('/');
  };
  return {
    authenticate,
    callback,
    googleCallback
  };
};
