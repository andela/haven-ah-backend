import tags from '../seedData/tags.data';

export default {
  up: queryInterface => queryInterface.bulkInsert('Tags', tags, {}),
  down: queryInterface => queryInterface.bulkDelete('Tags', null, {})
};
