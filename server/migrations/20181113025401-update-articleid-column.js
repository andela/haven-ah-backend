export default {
  up: queryInterface => queryInterface.sequelize.query('alter table "Comments" drop constraint "Comments_articleId_fkey"')
    .then(() => queryInterface.sequelize.query(
      `alter table "Comments"
          add constraint "Comments_articleId_fkey" foreign key("articleId") references "Articles" ("id")
          on delete cascade`
    )),

  down: queryInterface => queryInterface.sequelize.query('alter table "Comments" drop constraint "Comments_articleId_fkey"')
    .then(() => queryInterface.sequelize.query(
      `alter table "Comments"
          add constraint "Comments_articleId_fkey" foreign key("articleId") references "Articles" ("id")
          on delete no action`
    )),
};
