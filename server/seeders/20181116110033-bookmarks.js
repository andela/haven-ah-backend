import bookmarks from '../seedData/bookmarks.data';

export default {
  up: queryInterface => queryInterface.bulkInsert('Bookmarks', bookmarks, {}),
  down: queryInterface => queryInterface.bulkDelete('Bookmarks', null, {})
};
