import { Router } from 'express';
import Bookmark from '../controllers/bookmark';
import isAuthenticated from '../middlewares/checkAuth';
import validator from '../middlewares/paramChecker';
import checkIfArticleExists from '../middlewares/checkIfArticleExists';

import tryCatchWrapper from '../utilities/tryCatchWrapper';

const router = new Router();

router.post('/articles/:slug/bookmarks',
  isAuthenticated,
  validator.validateSlug,
  checkIfArticleExists,
  tryCatchWrapper(Bookmark.bookmarkArticle));

export default router;
