export default {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'Articles',
      'isFeatured',
      {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      }
    );
  },

  down: (queryInterface) => {
    queryInterface.removeColumn('Articles', 'isFeatured');
  },
};
