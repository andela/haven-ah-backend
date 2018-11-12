import userRepo from '../repository/userRepository';
import generateToken from '../utilities/jwtGenerator';
import passwordUtil from '../utilities/passwordHasher';
import { goodHttpResponse, badHttpResponse } from '../utilities/httpResponse';
import emailer from '../services/emailService';
import confirmEmail from '../emailTemplates/confirmationEmail';
import { getUrl } from '../utilities/currentEnv';
import resetTemplate from '../emailTemplates/passwordResetTemplate';
import followerRepo from '../repository/followUserRepository';

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
    const findUser = await userRepo.getUserByParam('email', email);
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
   *
   * @param {object} request
   * @param {object} response
   *
   * @returns {object} mail output
   */
  static async resetPassword(request, response) {
    const user = await userRepo.getUserByParam('email', request.body.email);
    if (!user) {
      return badHttpResponse(
        response,
        404,
        'This account does not exist.'
      );
    }
    const token = await generateToken(request.body.email);
    await userRepo.updateToken(request.body.email, token);
    const htmlBody = resetTemplate(token);
    const mailOptions = emailer.setMailOptions(
      request.body.email,
      'Password Reset Request',
      htmlBody
    );
    const mailInformation = await emailer.sendEmail(mailOptions);
    if (mailInformation.accepted.length > 0) {
      goodHttpResponse(response, 200, 'Mail delivered', { token, ...mailInformation });
    } else {
      badHttpResponse(response, 500, 'Error sending mail', mailInformation);
    }
  }

  /**
   *
   * @param {Object} request
   * @param {Object} response
   * @returns {Object} new password
   */
  static async updatePassword(request, response) {
    const mailId = request.userid;
    const password = hash(request.body.password);
    const user = await userRepo.updatePassword(mailId, password);
    if (user) {
      goodHttpResponse(response, 200, 'Password updated');
    } else {
      badHttpResponse(response, 404, 'User was not found');
    }
  }

  /**
   * This functions validates the
   * user token for expiration
   * @param {object} request
   * @param {object} response
   * @returns {object} user credentials
   */
  static async confirmPassword(request, response) {
    const mailId = request.userId;
    const user = await userRepo.getUserByParam('email', mailId);
    if (user) {
      goodHttpResponse(response, 200, 'Proceed to update password', user);
    } else {
      badHttpResponse(response, 404, 'Your token has expired.');
    }
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

  /**
   * This method gets a user profile
   * @param {object} request
   * @param {object} response
   * @returns {object} the user data
   */
  static async profile(request, response) {
    const data = await userRepo.getUserByParam('username', request.params.username);
    if (data === null) {
      return badHttpResponse(
        response,
        404,
        'User not found',
        'No data to show'
      );
    }
    const {
      id, firstName, lastName, facebook, google, twitter, bio, imageUrl, createdAt, updatedAt,
    } = data;

    const responseData = request.isAuthorized ? data : {
      id, firstName, lastName, facebook, google, twitter, bio, imageUrl, createdAt, updatedAt,
    };
    return goodHttpResponse(
      response,
      200,
      'User found',
      responseData,
    );
  }

  /**
   * This method updates the user profile in the DB
   * @param {object} request
   * @param {object} response
   * @returns {object} the response message to user
   */
  static async editProfile(request, response) {
    if (!request.isAuthorized) {
      return badHttpResponse(
        response,
        401,
        'You are not permitted to complete this action',
      );
    }
    if (request.body.images) {
      const imageUrl = request.body.images[0];
      request.body.imageUrl = imageUrl;
    }
    const updated = await userRepo.updateUser(request.body, request.params.username);

    const {
      id, username, firstName, lastName, email, isConfirmed, facebook,
      google, twitter, bio, imageUrl, createdAt, updatedAt,
    } = updated;

    return goodHttpResponse(
      response,
      200,
      'Account updated',
      {
        id,
        username,
        firstName,
        lastName,
        email,
        isConfirmed,
        facebook,
        google,
        twitter,
        bio,
        imageUrl,
        createdAt,
        updatedAt,
      },
    );
  }

  /**
   * Follow a new user
   * @param {object} request Request Object
   * @param {object} response Response Object
   * @returns {object} Error if operation was unsuccessful or success response
   * if operation was successful
   */
  static async follow(request, response) {
    const { username } = request.params;
    const followerId = request.userId;

    const user = await userRepo.getUserByParam('username', username);
    if (!user) {
      return badHttpResponse(
        response,
        404,
        `User with the username ${username} does not exist.`
      );
    }

    if (user.id === followerId) {
      return badHttpResponse(
        response,
        400,
        'Sorry, you can not follow yourself. You can only follow other users.'
      );
    }
    const follower = await userRepo.getUserByParam('id', followerId);

    const newFollowing = await followerRepo.followUser(user, follower);
    if (newFollowing instanceof Error) {
      return badHttpResponse(response, 400, newFollowing.message);
    }

    return goodHttpResponse(
      response,
      201,
      'You have followed this user.'
    );
  }

  /**
   * Unfollower a user
   * @param {object} request Request Object
   * @param {object} response Response Object
   * @returns {object} Error if operation was unsuccessful or success response
   * if operation was successful
   */
  static async unfollow(request, response) {
    const { username } = request.params;
    const followerId = request.userId;

    const user = await userRepo.getUserByParam('username', username);
    if (!user) {
      return badHttpResponse(
        response,
        404,
        `User with the username ${username} does not exist.`
      );
    }

    if (user.id === followerId) {
      return badHttpResponse(
        response,
        400,
        'Sorry, you can not unfollow yourself.'
      );
    }

    const follower = await userRepo.getUserByParam('id', followerId);
    const newUnfollowing = await followerRepo.unfollowUser(user, follower);

    if (newUnfollowing instanceof Error) {
      return badHttpResponse(
        response,
        400,
        newUnfollowing.message,
      );
    }

    return goodHttpResponse(
      response,
      200,
      'You have unfollowed this user.',
    );
  }

  /**
   * This method allows  the user to opt in/out of notifications
   * @param {object} request
   * @param {object} response
   * @returns {object} the response message to user
   */
  static async optNotification(request, response) {
    const { userId } = request;
    let updatedNotifications;
    const foundUser = await userRepo.getUserByParam('id', userId);
    if (foundUser.allowNotifications === false) {
      updatedNotifications = await foundUser.update({
        allowNotifications: true,
      });
      goodHttpResponse(
        response,
        200,
        'You successfully opted in to email notifications.',
        updatedNotifications
      );
    } else {
      updatedNotifications = await foundUser.update({
        allowNotifications: false,
      });
    }
    return goodHttpResponse(
      response,
      200,
      'You successfully opted out of email notifications.',
      updatedNotifications
    );
  }
}

export default User;
