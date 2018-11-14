export default {
  up: (queryInterface) => {
    const query = 'DELETE FROM pg_enum '
      + 'WHERE enumlabel = \'superadmin\' ';
    queryInterface.sequelize.query(query);
    queryInterface.sequelize.query("ALTER TYPE \"enum_Users_role\" ADD VALUE 'superadmin'");
  },

  down: (queryInterface) => {
    const query = 'DELETE FROM pg_enum '
      + 'WHERE enumlabel = \'superadmin\' ';
    return queryInterface.sequelize.query(query);
  }
};
