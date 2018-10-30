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
}

export default UserRepository;
