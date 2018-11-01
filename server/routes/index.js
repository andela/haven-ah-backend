import { Router } from 'express';

import userRouter from './users';
import articleRouter from './article';

const router = Router();

router.use(
  userRouter,
  articleRouter,
);

export default router;
