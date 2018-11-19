import readingStats from '../seedData/readingStats.data';

export default {
  up: queryInterface => queryInterface.bulkInsert('ReadingStats', readingStats, {}),
  down: queryInterface => queryInterface.bulkDelete('ReadingStats', null, {})
};
