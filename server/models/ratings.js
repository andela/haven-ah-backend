export default(sequelize, DataTypes) => {
  const Ratings = sequelize.define('Ratings', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {});
  Ratings.associate = (models) => {
    Ratings.belongsTo(models.Articles, {
      foreignKey: 'articleId'
    });
  };
  return Ratings;
};
