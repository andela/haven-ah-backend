export default{
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'Comments',
      'isDeleted',
      Sequelize.BOOLEAN
    );
  },

  down: (queryInterface) => {
    queryInterface.removeColumn('Comments', 'isDeleted');
  },
};
