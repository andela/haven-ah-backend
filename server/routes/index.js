import { Router } from 'express';

import userRouter from './users';
import articleRouter from './article';
import bookmarkRouter from './bookmark';
import reactionRouter from './reaction';

const router = Router();

router.use(
  userRouter,
  articleRouter,
  bookmarkRouter,
  reactionRouter,
);

export default router;
