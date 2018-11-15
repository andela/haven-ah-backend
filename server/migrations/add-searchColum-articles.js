const tableName = 'Articles';
const columnName = 'searchVectors';

export default {
  up: (queryInterface) => {
    const { sequelize } = queryInterface;
    const searchFields = ['title', 'body', 'description'];

    return sequelize
      .query(`ALTER TABLE "${tableName}" ADD COLUMN "${columnName}" TSVECTOR`)
      .then(() => sequelize
        .query(`UPDATE "${tableName}" SET "${columnName}" = to_tsvector('english', title || ' ' || body || description)`)
        .then(() => sequelize
          .query(`CREATE INDEX searchIndex ON "${tableName}" ("${columnName}");`)
          .then(() => sequelize
            .query(`CREATE TRIGGER updateSearchIndex BEFORE INSERT OR UPDATE ON "${tableName}" FOR EACH ROW EXECUTE PROCEDURE tsvector_update_trigger("${columnName}", 'pg_catalog.english', ${searchFields.join(', ')})`))));
  },

  down: (queryInterface) => {
    const { sequelize } = queryInterface;

    return sequelize
      .query(`DROP TRIGGER updateSearchIndex ON "${tableName}"`)
      .then(() => sequelize
        .query('DROP INDEX searchIndex'))
      .then(() => sequelize
        .query(`ALTER TABLE "${tableName}" DROP COLUMN "${columnName}"`));
  },
};
