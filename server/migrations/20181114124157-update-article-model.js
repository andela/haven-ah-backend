export default {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'Articles',
      'isDeleted',
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      }
    );
  },

  down: (queryInterface) => {
    queryInterface.removeColumn('Articles', 'isDeleted');
  },
};
