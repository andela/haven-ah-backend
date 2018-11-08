import { Router } from 'express';
import Article from '../controllers/article';
import inputValidator from '../middlewares/validations';
import Comment from '../controllers/comment';
import isAuthenticated from '../middlewares/checkAuth';
import validator from '../middlewares/paramChecker';
import tryCatchWrapper from '../utilities/tryCatchWrapper';
import checkIfArticleExists from '../middlewares/checkIfArticleExists';

const router = new Router();

router.post(
  '/articles',
  isAuthenticated,
  inputValidator.articleValidator,
  tryCatchWrapper(Article.createArticle)
);
router.post(
  '/articles/:slug/rating',
  isAuthenticated,
  inputValidator.ratingValidator,
  checkIfArticleExists,
  tryCatchWrapper(Article.rateArticle)
);

router.post('/articles', isAuthenticated, tryCatchWrapper(Article.createArticle));
router.get('/articles', Article.getArticles);
router.post('/articles/:slug/comments',
  isAuthenticated,
  inputValidator.validateComment,
  tryCatchWrapper(Comment.createComment));

router.post('/articles/:slug/comments/:parentId',
  isAuthenticated,
  inputValidator.validateReply,
  checkIfArticleExists,
  tryCatchWrapper(Comment.createReply));

router.post('/articles/:slug/complaints',
  isAuthenticated,
  validator.validateComplaint,
  checkIfArticleExists,
  tryCatchWrapper(Article.postComplaint));

export default router;
