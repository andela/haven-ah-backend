export default (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    isHighlighted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    highlightedText: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {});

  Comment.associate = (models) => {
    Comment.belongsTo(models.Articles, {
      foreignKey: 'articleId',
    });
    Comment.belongsTo(models.User, {
      foreignKey: 'userId',
    });
    Comment.hasMany(models.Comment, {
      as: 'Replies',
      foreignKey: 'parentId',
      useJunctionTable: false,
    });
    Comment.hasMany(models.CommentHistory, {
      as: 'editHistory',
      foreignKey: 'commentId',
      useJunctionTable: false,
    });
  };
  return Comment;
};
