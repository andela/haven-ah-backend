import Model from '../models';

const { User } = Model;

/**
 * User repository class
 */
class UserRepository {
  /**
   * Function to create a user entity in the database
   * @param {object} user User object
   * @returns {object} User object
   */
  static async createUser(user) {
    user.role = 'user';
    try {
      return await User.create(user);
    } catch (error) {
      return error;
    }
  }

  /**
 * Finds a user by email
 * @param {string} email Email to search by
 * @param {string} username username
 * @returns {object | null} User object or null if user is not found
 */
  static async getUserByCredentials(email, username) {
    const user = await User.findAll({
      where: { email, username },
      attributes: {
        include: [
          'id',
          'firstName'
        ],
        exclude: [
          'createdAt',
          'updatedAt',
          'deletedAt',
          'isDeleted',
          'password'
        ],
      }
    });
    if (user.length <= 0) return null;
    return user;
  }

  /**
 * This method finds all non-admin users in the database
 *@returns {object | null} the results from DB
 */
  static async getAllUsers() {
    const allUsers = await User.findAll({
      where: {
        role: 'user',
      },
      attributes: {
        include: [
          'id',
          'firstName',
          'lastName',
          'facebook',
          'google',
          'twitter',
          'bio',
          'imageUrl',
          'createdAt',
          'updatedAt',
        ],
        exclude: [
          'email',
          'updatedAt',
          'deletedAt',
          'isDeleted',
          'password',
          'emailConfirmation',
          'resetToken',
          'role',
        ],
      },
    });
    if (!allUsers) return null;
    return allUsers;
  }

  /**
   *
   * @param {object} user
   * @returns {Object | null} User object or null
   */
  static async deleteUser(user) {
    const userEntity = await User.find({
      where: {
        username: user.username,
      }
    });
    if (!userEntity) return null;
    await userEntity.destroy();
  }

  /**
 * Gets a user by the email
 * @param {string} email Email to search by
 * @returns {object | null} User object or null if user is not found
 */
  static async getUserByEmail(email) {
    const user = await User.findOne({
      where: { email },
      attributes: {
        include: ['id', 'firstName'],
        exclude: ['createdAt', 'updatedAt', 'deletedAt', 'isDeleted']
      }
    });
    if (!user) return null;
    return user;
  }

  /**
   * Finds a user by email
   * @param {string} email Email to search by
   * @param {string} username username
   * @returns {object | null} User object or null if user is not found
   */
  static async getUserByCredentials(email, username) {
    const user = await User.findAll({
      where: { email, username },
      attributes: {
        include: ['id', 'firstName'],
        exclude: ['createdAt', 'updatedAt', 'deletedAt', 'isDeleted']
      }
    });
    return user.length <= 0 ? null : user;
  }

  /**
   * This method finds all non-admin users in the database
   *@returns {object | null} the results from DB
  */
  static async getAllUsers() {
    const allUsers = await User.findAll({
      where: {
        role: 'user',
      },
      attributes: {
        include: [
          'id',
          'firstName',
          'lastName',
          'facebook',
          'google',
          'twitter',
          'bio',
          'imageUrl',
          'createdAt',
          'updatedAt',
        ],
        exclude: [
          'email',
          'updatedAt',
          'deletedAt',
          'isDeleted',
          'password',
          'emailConfirmation',
          'resetToken',
          'role',
        ],
      },
    });
    return allUsers || null;
  }
}

export default UserRepository;
