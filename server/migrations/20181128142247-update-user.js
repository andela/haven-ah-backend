export default {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'Users',
      'isFeaturedAuthor',
      Sequelize.BOOLEAN
    );
  },

  down: (queryInterface) => {
    queryInterface.removeColumn('Users', 'isFeaturedAuthor');
  },
};
