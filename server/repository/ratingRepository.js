import Model from '../models';

const { Ratings } = Model;

/**
 * Tag repository class
 */
class RatingRepository {
  /**
 * Function to create a new rating
 * @param {string} newRating
 * @returns {object} rating
 */
  static async createRating(newRating) {
    const existingRating = await Ratings.findOne({
      where: {
        userId: newRating.userId,
        articleId: newRating.articleId,
      },
    });

    if (existingRating) {
      const updatedRating = await existingRating.update({
        rating: newRating.rating
      });
      return updatedRating;
    }
    const rating = await Ratings.create(newRating);
    return rating;
  }
}

export default RatingRepository;
