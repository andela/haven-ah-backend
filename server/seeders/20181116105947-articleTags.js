import articleTags from '../seedData/articleTags.data';

export default {
  up: queryInterface => queryInterface.bulkInsert('ArticleTags', articleTags, {}),
  down: queryInterface => queryInterface.bulkDelete('ArticleTags', null, {})
};
