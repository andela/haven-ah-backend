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
    const newUser = await User.create(user);
    return newUser;
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
   * Removes a user from the databasse
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
 * Gets a user by the id
 * @param {string} userId Id to search by
 * @returns {object | null} User object or null if user is not found
 */
  static async getUserById(userId) {
    const user = await User.findByPk(userId);

    if (!user) return null;
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
    return allUsers || null;
  }

  /**
   * Change confirmEmail field to true
   * @param {integer} userId User Id
   * @returns {object} i dont know yet
   */
  static async confirmUserEmail(userId) {
    const user = await this.getUserById(userId);
    if (!user) {
      return null;
    }

    if (user.isConfirmed) {
      return new Error('This account has been confirmed already.');
    }

    const response = await User.update(
      { isConfirmed: true },
      { where: { id: user.id } }
    );
    return response;
  }
}

export default UserRepository;
