export default (sequelize, DataTypes) => {
  const Notifications = sequelize.define('Notifications', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    followerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    notificationType: {
      type: DataTypes.ENUM,
      values: ['NEW_Article', 'NEW_Comment', 'NEW_Reaction', 'NEW_Follower'],
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isSent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  }, {});
  Notifications.associate = (models) => {
    Notifications.belongsTo(models.Articles, {
      foreignKey: 'articleId',
    });
  };
  return Notifications;
};
