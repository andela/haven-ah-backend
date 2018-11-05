import { Router } from 'express';

import userRouter from './users';
import articleRouter from './article';
import bookmarkRouter from './bookmark';

const router = Router();

router.use(
  userRouter,
  articleRouter,
  bookmarkRouter
);

export default router;
