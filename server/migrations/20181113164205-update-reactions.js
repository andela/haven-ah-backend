export default {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'Reactions',
      'commentId',
      {
        type: Sequelize.INTEGER,
        allowNull: true
      }
    );
    queryInterface.changeColumn(
      'Reactions',
      'articleId',
      {
        type: Sequelize.INTEGER,
        allowNull: true
      }
    );
    const query = 'DELETE FROM pg_enum '
      + 'WHERE enumlabel = \'Dislike\' ';
    return queryInterface.sequelize.query(query);
  },
  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn(
      'Reactions',
      'commentId'
    );
    queryInterface.changeColumn(
      'Reactions',
      'articleId',
      {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    );
    queryInterface.sequelize.query("ALTER TYPE \"enum_Reactions_reactionType\" ADD VALUE IF NOT EXISTS 'Dislike'");
  }
};
