import { Router } from 'express';
import Bookmark from '../controllers/bookmark';
import isAuthenticated from '../middlewares/checkAuth';
import validator from '../middlewares/paramChecker';

const router = new Router();

router.post('/articles/:slug/bookmarks', isAuthenticated, validator.validateSlug, Bookmark.bookmarkArticle);

export default router;
