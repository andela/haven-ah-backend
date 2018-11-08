export default{
  up: (queryInterface, Sequelize) => queryInterface.createTable('Complaints', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
        as: 'Complainer',
      },
      onDelete: 'CASCADE'
    },
    articleId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Articles',
        key: 'id',
        as: 'Article'
      },
      onDelete: 'CASCADE'
    },
    complaintType: {
      type: Sequelize.ENUM,
      values: ['Rules Violation', 'Abuse', 'Plagiarism', 'Others']
    },
    complaintBody: {
      type: Sequelize.STRING
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),

  down: queryInterface => queryInterface.dropTable('Complaints'),
};
