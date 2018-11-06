import Model from '../models';

const { Tags, ArticleTag } = Model;

/**
 * Tag repository class
 */
class TagRepository {
  /**
 * Function to create a new tag
 * @param {string} tagName
 * @param {number} articleId
 * @returns {object} tag
 */
  static async createTag(tagName, articleId) {
    const tag = await Tags.findOrCreate({
      where: {
        tagName,
      }
    })
      .spread(tagObject => (tagObject.get({
        plain: true
      })));
    await ArticleTag.create({
      tagId: tag.id,
      articleId
    });
    return tag;
  }

  /**
   * Function to receive and process article tags
   * @param {object} tags
   * @param {number} articleId
   * @returns {object} promise
   */
  static async processTags(tags, articleId) {
    const tagName = tags.split(' ');
    const tagPromises = [];
    for (let i = 0; i < tagName.length; i += 1) {
      tagPromises.push(this.createTag(tagName[i], articleId));
    }
    return tagPromises;
  }
}

export default TagRepository;
