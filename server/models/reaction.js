export default (sequelize, DataTypes) => {
  const Reaction = sequelize.define('Reaction', {
    reactionType: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['Like', 'Love']
    },
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    commentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
    Reaction.belongsTo(models.Comment, {
      foreignKey: 'commentId',
      as: 'Comment'
    });
  };
  return Reaction;
};
