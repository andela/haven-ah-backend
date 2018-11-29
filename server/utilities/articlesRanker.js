/**
 * This function ranks and sorts them in descending order
 * according to the ranks.
 * @param {Array} articles
 * @returns {Array} ranked articles
 */
const rankArticles = (articles) => {
  articles.map((article) => {
    const activitySum = article.Comments.length + article.Reactions.length;
    const reads = 2 * article.Readers.length;
    const rank = activitySum / reads;
    article.dataValues.rank = rank;
    return article;
  });
  articles = articles.sort((a, b) => b.dataValues.rank - a.dataValues.rank);
  return articles;
};

export default rankArticles;
