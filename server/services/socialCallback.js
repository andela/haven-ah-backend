import userRepo from '../repository/userRepository';
/**
   * callback function for social login
   * @param {object} accessToken token from social login
   * @param  {object} refreshToken token from social login
   * @param  {object} profile of a user from social login
   * @param {function} done end of function
   * @returns {function} callback
   */
const socialCallback = (accessToken, refreshToken, profile, done) => {
  const email = profile.emails[0].value;
  const { familyName, givenName } = profile.name;
  const imageUrl = profile.photos[0].value;

  return userRepo.findOrCreate(email, familyName, givenName, imageUrl, done);
};

export default socialCallback;
