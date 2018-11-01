export default (sequelize, DataTypes) => {
  const ArticleTag = sequelize.define('ArticleTag', {
    tagId: DataTypes.INTEGER,
    articleId: DataTypes.INTEGER
  }, {});
  ArticleTag.associate = (models) => {
    ArticleTag.belongsTo(models.Articles, {
      foreignKey: 'articleid',
      onDelete: 'CASCADE',
    });
  };
  return ArticleTag;
};
