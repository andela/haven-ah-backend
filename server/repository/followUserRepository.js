/**
 * Handles user followers and followings
 */
class FollowerRepository {
  /**
   * Creates a new user follower
   * @param {object} user User to be followed
   * @param {integer} follower Follower
   * @returns {array} An array of the operation
   */
  static async followUser(user, follower) {
    const existingFollower = await this.checkIfFollowing(user, follower);

    if (existingFollower) {
      return new Error('Sorry. You already follow this user');
    }
    const newFollower = await user.addFollower(follower);
    return newFollower;
  }

  /**
  * Removes a follower relationship
  * @param {object} user User following
  * @param {object} following User being followed
  * @returns {integer} no of rows removed
  */
  static async unfollowUser(user, following) {
    const existingFollower = await this.checkIfFollowing(user, following);

    if (!existingFollower) {
      return new Error('Sorry. You currently don\'t follow this user.');
    }

    const result = await user.removeFollower(following);
    return result;
  }

  /**
   * Checks if a user is currently a follower of another user
   * @param {object} user User being followed
   * @param {integer} follower User following
   * @returns {boolean} Boolean indicating whether a user is a follower or not
   */
  static async checkIfFollowing(user, follower) {
    const isExistingFollower = await user.hasFollower(follower);

    return isExistingFollower;
  }
}

export default FollowerRepository;
