export default(sequelize, DataTypes) => {
  const Tags = sequelize.define('Tags', {
    tagName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  Tags.associate = (models) => {
    Tags.belongsToMany(models.Articles, {
      as: 'Articles',
      through: 'ArticleTag',
      foreignKey: 'id'
    });
  };
  return Tags;
};
