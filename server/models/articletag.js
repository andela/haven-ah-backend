export default (sequelize, DataTypes) => {
  const ArticleTag = sequelize.define('ArticleTag', {
    tagId: DataTypes.INTEGER,
    articleId: DataTypes.INTEGER
  }, {});
  return ArticleTag;
};
