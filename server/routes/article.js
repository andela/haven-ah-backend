import { Router } from 'express';
import Article from '../controllers/article';
import inputValidator from '../middlewares/validations';
import Comment from '../controllers/comment';
import isAuthenticated from '../middlewares/checkAuth';
import validator from '../middlewares/paramChecker';
import tryCatchWrapper from '../utilities/tryCatchWrapper';
import checkIfArticleExists from '../middlewares/checkIfArticleExists';
import isAuthorized from '../middlewares/authorization';


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

router.post('/articles',
  isAuthenticated,
  tryCatchWrapper(Article.createArticle));

router.get('/articles',
  tryCatchWrapper(Article.getArticles));

router.post('/articles/:slug/comments',
  isAuthenticated,
  inputValidator.validateComment,
  checkIfArticleExists,
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

router.put(
  '/articles/:slug/comments/:id',
  isAuthenticated,
  inputValidator.validateCommentUpdate,
  isAuthorized.comment,
  tryCatchWrapper(Comment.updateComment),
);

router.get(
  '/articles/:slug',
  validator.validateSlug,
  tryCatchWrapper(Article.getArticle)
);

router.get(
  '/articles/:slug/comments/:id',
  isAuthenticated,
  inputValidator.validateCommentParam,
  isAuthorized.comment,
  tryCatchWrapper(Comment.getCommentWithHistory),
);
export default router;
