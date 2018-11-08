import { Router } from 'express';
import Article from '../controllers/article';
import inputValidator from '../middlewares/validations';
import Comment from '../controllers/comment';
import isAuthenticated from '../middlewares/checkAuth';

const router = new Router();

router.post(
  '/articles',
  isAuthenticated,
  inputValidator.articleValidator,
  Article.createArticle
);
router.post(
  '/articles/:slug/rating',
  isAuthenticated,
  inputValidator.ratingValidator,
  Article.rateArticle
);

router.post('/articles', isAuthenticated, Article.createArticle);
router.get('/articles', Article.getArticles);
router.post('/articles/:slug/comments', isAuthenticated, inputValidator.validateComment, Comment.createComment);
router.post('/articles/:slug/comments/:parentId', isAuthenticated, inputValidator.validateReply, Comment.createReply);

export default router;
