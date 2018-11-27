export default {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'Articles',
      'isHeroArticle',
      {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      }
    );
  },

  down: (queryInterface) => {
    queryInterface.removeColumn('Articles', 'isHeroArticle');
  },
};
