import userRepo from '../repository/userRepository';
import generateToken from '../utilities/jwtGenerator';
import passwordUtil from '../utilities/passwordHasher';
import { goodHttpResponse, badHttpResponse } from '../utilities/httpResponse';
import emailer from '../services/emailService';
import confirmEmail from '../emailTemplates/confirmationEmail';
import { getUrl } from '../utilities/currentEnv';


const { hash, compare } = passwordUtil;
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

    const user = await userRepo.getUserByCredentials(email, username);
    if (user) {
      return badHttpResponse(
        response,
        409,
        'This account already exists. Consider sign in.',
        'We found another user with the same email and/or username',
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
    const url = `${getUrl}/auth/confirm/${token}`;
    const emailBody = confirmEmail.replace('{url}', url);

    const emailOptions = emailer.setMailOptions(newUser.email, 'Email Confirmation', emailBody);
    emailer.sendEmail(emailOptions);

    return goodHttpResponse(
      response,
      201,
      `Hello ${newUser.username}, Welcome to Author's Haven. An email has been sent to your email account. Please confirm your account to proceed`,
    );
  }

  /**
   * Get all non-admin users.
   * @param {object} request
   * @param {object} response
   * @returns {object} The JSON response to the user.
   */
  static async listAll(request, response) {
    const allUsers = await userRepo.getAllUsers();
    if (allUsers.length <= 0) {
      return goodHttpResponse(
        response,
        200,
        'Users not found'
      );
    }
    return goodHttpResponse(
      response,
      200,
      'Users found',
      allUsers
    );
  }

  /**
   * Login a User
   * @param {object} request Request Object
   * @param {object} response Response Object
   * @returns {object} User Object
   */
  static async signin(request, response) {
    const {
      email,
      password,
    } = request.body;
    const findUser = await userRepo.getUserByEmail(email);
    if (findUser) {
      const validatePassword = await compare(password, findUser.password);
      if (validatePassword === false) {
        return badHttpResponse(
          response,
          401,
          'incorrect password, please try again'
        );
      }
      const token = generateToken(findUser.id);
      return goodHttpResponse(
        response,
        200,
        `Hello ${findUser.username}, Welcome Back!`,
        { token }
      );
    }
    return badHttpResponse(
      response,
      404,
      'This account does not exist. Consider signing up.'
    );
  }

  /**
   * Confirms a user account
   * @param {object} request Request Object
   * @param {object} response Response Object
   * @returns {object} Confirmation success
   */
  static async confirm(request, response) {
    const { userId } = request;
    const user = await userRepo.confirmUserEmail(userId);

    if (!user) {
      return badHttpResponse(
        response,
        404,
        'This user was not found',
      );
    }

    if (user instanceof Error) {
      return badHttpResponse(
        response,
        400,
        user.message,
      );
    }
    const token = generateToken(user.id);

    return goodHttpResponse(
      response,
      200,
      'Your email has been confirmed',
      { token },
    );
  }
}

export default User;
