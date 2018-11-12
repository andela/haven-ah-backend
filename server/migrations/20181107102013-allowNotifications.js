export default {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'Users',
      'allowNotifications',
      Sequelize.BOOLEAN
    );
  },
  down: (queryInterface) => {
    queryInterface.removeColumn('Users', 'allowNotifications');
  },
};
