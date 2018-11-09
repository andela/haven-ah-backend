
export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Reactions', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    reactionType: {
      type: Sequelize.ENUM,
      allowNull: false,
      values: ['Like', 'Dislike', 'Love']
    },
    articleId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Articles',
        key: 'id',
        as: 'Article'
      },
      onDelete: 'CASCADE'
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
        as: 'User'
      }
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
  down: queryInterface => queryInterface.dropTable('Reactions')
};
