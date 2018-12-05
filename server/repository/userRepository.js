import Model from '../models';


const { Op } = Model.Sequelize;
const { User } = Model;

const attributes = [
  'id',
  'username',
  'firstName',
  'lastName',
  'email',
  'isConfirmed',
  'allowNotifications',
  'facebook',
  'google',
  'twitter',
  'bio',
  'imageUrl',
  'createdAt',
  'updatedAt',
  'role',
  'isFeaturedAuthor'
];

/**
 * User repository class
 */
class UserRepository {
  /**
   * Function to create a user entity in the database
   * @param {object} user User object
   * @param {string} role User role
   * @returns {object} User object
   */
  static async createUser(user, role) {
    user.role = role;
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
  * Finds a user by parameter
  * @param {string} param Parameter to search by
  * @param {string} value Parameter value
  * @returns {object | null} User object or null if user is not found
  */
  static async getUserByParam(param, value) {
    if (param === 'email') {
      attributes.push('password');
    }

    const user = await User.findOne({
      where: { [param]: value },
      attributes
    });

    if (!user) {
      return null;
    }
    return user;
  }

  /**
  * Finds a user by email or username
  * @param { string } email Email to search by
  * @param { string } username Username to search by
  * @returns { object | null } User object or null if user is not found
  */
  static async getUserByCredentials(email, username) {
    const user = await User.findOne({
      where: {
        [Op.or]: { email, username }
      },
      attributes
    });

    if (!user) {
      return null;
    }
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
      attributes
    });

    return allUsers;
  }

  /**
   * Removes a user from the database
   * @param {object} user
   * @returns {Object | null} User object or null
   */
  static async deleteUser(user) {
    const userEntity = await this.getUserByParam('username', user.username);

    if (!userEntity) return null;
    await userEntity.destroy();
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
 * finds a user by email, if user exists return the user, if not create one
 * @param {string} email user Email to search by
 * @param {string} lastName user lastName to insert in database
 * @param {string} firstName user firstName to insert in database
 * @param {string} imageUrl imageUrl to insert in database
 * @param {string} done  callback function
 * @returns {object} The JSON response to the user.
 */
  static findOrCreate(email, lastName, firstName, imageUrl, done) {
    const username = `${firstName}${lastName}`;
    User.findOrCreate({
      where: {
        email
      },
      defaults: {
        firstName,
        lastName,
        email,
        imageUrl,
        username
      }
    })
      .spread(foundUser => done(null, foundUser));
  }

  /**
   * Change confirmEmail field to true
   * @param {integer} userId User Id
   * @returns {object} i dont know yet
   */
  static async confirmUserEmail(userId) {
    const user = await this.getUserByParam('id', userId);
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

  /**
   * Sets an author as featured
   * @param {string} username Author's username
   * @returns {object} Featured Author
   */
  static async setFeaturedAuthor(username) {
    const featuredAuthor = await this.getUserByParam('isFeaturedAuthor', true);
    if (featuredAuthor) {
      await this.updateUser({ isFeaturedAuthor: false }, featuredAuthor.username);
    }

    const newFeaturedAuthor = await this.updateUser({ isFeaturedAuthor: true }, username);
    return newFeaturedAuthor;
  }
}

export default UserRepository;
