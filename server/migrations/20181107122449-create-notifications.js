

export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Notifications', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    articleId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    followerId: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    content: {
      type: Sequelize.STRING
    },
    notificationType: {
      type: Sequelize.ENUM,
      values: ['NEW_Article', 'NEW_Comment', 'NEW_Reaction', 'NEW_Follower'],
    },
    isSent: {
      type: Sequelize.BOOLEAN
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
  }),
  down: queryInterface => queryInterface.dropTable('Notifications'),
};
