import { Router } from 'express';
import Bookmark from '../controllers/bookmark';
import isAuthenticated from '../middlewares/checkAuth';
import validator from '../middlewares/paramChecker';
import isAuthorized from '../middlewares/authorization';
import checkIfArticleExists from '../middlewares/checkIfArticleExists';

import tryCatchWrapper from '../utilities/tryCatchWrapper';

const router = new Router();

router.post('/users/:username/bookmarks/:slug',
  isAuthenticated,
  validator.validateSlug,
  checkIfArticleExists,
  tryCatchWrapper(Bookmark.bookmarkArticle));

router.get('/users/:username/bookmarks',
  isAuthenticated,
  tryCatchWrapper(Bookmark.getBookmarkedArticles));

router.delete('/users/:username/bookmarks/:slug/:id',
  isAuthenticated,
  validator.validateSlug,
  checkIfArticleExists,
  isAuthorized.unbookmark,
  tryCatchWrapper(Bookmark.unbookmarkArticle));

export default router;
