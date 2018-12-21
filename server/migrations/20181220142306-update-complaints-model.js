export default {
  up: (queryInterface) => {
    queryInterface.sequelize.query("ALTER TYPE \"enum_Complaints_complaintType\" ADD VALUE 'Others'");
  },

  down: (queryInterface) => {
    const query = 'DELETE FROM pg_enum '
      + 'WHERE enumlabel = \'Others\' ';
    return queryInterface.sequelize.query(query);
  }
};
