export default {
  up: queryInterface => queryInterface.sequelize.query(
    'alter table "CommentHistories" drop constraint "CommentHistories_commentId_fkey"'
  )
    .then(() => queryInterface.sequelize.query(
      `alter table "CommentHistories"
          add constraint "CommentHistories_commentId_fkey" foreign key("commentId") references "Comments" ("id")
          on delete cascade`
    )),

  down: queryInterface => queryInterface.sequelize.query(
    'alter table "CommentHistories" drop constraint "CommentHistories_commentId_fkey"'
  )
    .then(() => queryInterface.sequelize.query(
      `alter table "CommentHistories"
          add constraint "CommentHistories_commentId_fkey" foreign key("commentId") references "Comments" ("id")
          on delete no action`
    )),
};
