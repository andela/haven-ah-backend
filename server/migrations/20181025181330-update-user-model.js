/* eslint no-unused-vars:0 */
export default {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'Users',
      'firstName',
      Sequelize.STRING
    );
    queryInterface.addColumn(
      'Users',
      'lastName',
      Sequelize.STRING
    );
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Users', 'firstName');
    queryInterface.removeColumn('Users', 'lastName');
  },
};
