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
   * Updates a user password resetToken
   * @param {string} email
   * @param {string} resetToken
   * @returns {object} user
   */
  static async updateToken(email, resetToken) {
    const user = await User.update({
      resetToken
    },
    {
      where: { email }
    });
    return user;
  }

  /**
   * Function to update a user password
   * @param {string} email
   * @param {string} password
   * @returns {object} user
   */
  static async updatePassword(email, password) {
    const user = await User.update({
      password
    },
    {
      where: { email }
    });
    return user;
  }

  /**
 * Finds a user by email and username
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
   * This method finds a user by their username
   * Finds a user using the userId
   * @param {number} username userId
   * @returns {object | null} the details of the user.
   */
  static async getUserbyUsername(username) {
    const oneUser = await User.findOne({
      where: {
        username,
      },
      attributes: [
        'id',
        'username',
        'firstName',
        'lastName',
        'email',
        'isConfirmed',
        'facebook',
        'google',
        'twitter',
        'bio',
        'imageUrl',
        'createdAt',
        'updatedAt',
      ],
    });
    if (!oneUser) return null;
    return oneUser;
  }

  /**
   * Updates the user profile
   * @param { object } newData
   * @param { string } username
   * @returns { boolean } true for successful update.
   */
  static async updateUser(newData, username) {
    const updated = await User.update(newData, {
      returning: true,
      where: {
        username,
      },
    });
    return updated[1][0].dataValues;
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

    await User.update(
      { isConfirmed: true },
      { where: { id: user.id } }
    );
    return user;
  }
}

export default UserRepository;
