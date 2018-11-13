export default (sequelize, DataTypes) => {
  const CommentHistory = sequelize.define('CommentHistory', {
    commentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    oldComment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {});
  CommentHistory.associate = (models) => {
    CommentHistory.belongsTo(models.Comment, {
      foreignKey: 'commentId',
      useJunctionTable: false,
    });
  };
  return CommentHistory;
};
