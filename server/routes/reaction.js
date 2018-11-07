import { Router } from 'express';
import Reaction from '../controllers/reaction';
import isAuthenticated from '../middlewares/checkAuth';
import validator from '../middlewares/paramChecker';
import checkIfArticleExists from '../middlewares/checkIfArticleExists';

const router = new Router();

router.post('/articles/:slug/reactions',
  isAuthenticated,
  validator.validateReaction,
  checkIfArticleExists,
  Reaction.postReaction);

export default router;
