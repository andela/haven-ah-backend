export default {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'Complaints',
      'adminAction',
      {
        type: Sequelize.TEXT,
        allowNull: true,
      }
    );
  },

  down: (queryInterface) => {
    queryInterface.removeColumn('Complaints', 'adminAction');
  },
};
