export default (sequelize, DataTypes) => {
  const Reaction = sequelize.define('Reaction', {
    reactionType: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['Like', 'Dislike', 'Love']
    },
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});

  Reaction.associate = (models) => {
    Reaction.belongsTo(models.Articles, {
      foreignKey: 'articleId',
      as: 'Article',
      onDelete: 'CASCADE'
    });
    Reaction.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'User'
    });
  };
  return Reaction;
};
