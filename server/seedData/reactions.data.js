import { LIKE, LOVE } from '../utilities/reactionConstant';

const reactions = [
  {
    reactionType: LIKE,
    articleId: 1,
    userId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    reactionType: LOVE,
    articleId: 2,
    userId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    reactionType: LIKE,
    commentId: 1,
    userId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    reactionType: LOVE,
    articleId: 4,
    userId: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    reactionType: LOVE,
    commentId: 3,
    userId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    reactionType: LIKE,
    articleId: 3,
    userId: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    reactionType: LIKE,
    commentId: 9,
    userId: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    reactionType: LOVE,
    articleId: 7,
    userId: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    reactionType: LOVE,
    articleId: 7,
    userId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    reactionType: LIKE,
    commentId: 10,
    userId: 6,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default reactions;
