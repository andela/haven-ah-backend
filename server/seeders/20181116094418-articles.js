import articles from '../seedData/articles.data';


export default{
  up: queryInterface => queryInterface.bulkInsert('Articles', articles, {}),
  down: queryInterface => queryInterface.bulkDelete('Articles', null, {})
};
