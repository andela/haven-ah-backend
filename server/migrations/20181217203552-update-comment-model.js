export default {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'Comments',
      'hasBeenEdited',
      Sequelize.BOOLEAN
    );
  },

  down: (queryInterface) => {
    queryInterface.removeColumn('Comments', 'hasBeenEdited');
  },
};
