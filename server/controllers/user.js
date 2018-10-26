import userRepo from '../repository/userRepository';
import generateToken from '../utilities/jwtGenerator';
import passwordUtil from '../utilities/passwordHasher';
import { goodHttpResponse, badHttpResponse } from '../utilities/httpResponse';


const { hash } = passwordUtil;
/**
 * User Controller class
 */
class User {
  /**
   * Register new User
   * @param {object} request Request Object
   * @param {object} response Response Object
   * @returns {object} User Object
   */
  static async signup(request, response) {
    const {
      firstName,
      lastName,
      email,
      username,
      password,
    } = request.body;

    const user = await userRepo.getUserByEmail(email);
    if (user) {
      return badHttpResponse(
        response,
        409,
        'This account already exists. Consider sign in.'
      );
    }

    const newUser = await userRepo.createUser({
      firstName,
      lastName,
      email,
      username,
      password: hash(password),
    });

    const token = generateToken(newUser.id);
    return goodHttpResponse(
      response,
      201,
      `Hello ${newUser.username}, Welcome to Author's Haven.`,
      token
    );
  }
}

export default User;
