import userRepo from '../repository/userRepository';
import generateToken from '../utilities/jwtGenerator';
import passwordUtil from '../utilities/passwordHasher';


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
      return response.status(409).json({
        status: 409,
        message: `User with this email, "${email}" already exists`,
      });
    }

    const newUser = await userRepo.createUser({
      firstName,
      lastName,
      email,
      username,
      password: hash(password),
    });

    const token = generateToken(newUser.id);
    return response.status(201).json({
      status: 201,
      message: `Hello ${newUser.username}, Welcome to Author's Haven.`,
      data: {
        token,
      }
    });
  }
}

export default User;
