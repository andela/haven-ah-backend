export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('CommentHistories', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    commentId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Comments',
        key: 'id',
        as: 'commentId',
      }
    },
    oldComment: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('CommentHistories'),
};
