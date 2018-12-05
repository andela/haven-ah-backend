import { Router } from 'express';
import Article from '../controllers/article';
import inputValidator from '../middlewares/validations';
import Comment from '../controllers/comment';
import Reactions from '../controllers/reaction';
import isAuthenticated from '../middlewares/checkAuth';
import validator from '../middlewares/paramChecker';
import tryCatchWrapper from '../utilities/tryCatchWrapper';
import checkIfArticleExists from '../middlewares/checkIfArticleExists';
import isAuthorized from '../middlewares/authorization';
import checkPermissions from '../middlewares/checkPermissions';

const router = new Router();

router.post(
  '/articles',
  isAuthenticated,
  checkPermissions,
  inputValidator.articleValidator,
  tryCatchWrapper(Article.createArticle)
);

router.get(
  '/articles/featured',
  tryCatchWrapper(Article.getFeaturedArticle)
);

router.post(
  '/articles/:slug/rating',
  isAuthenticated,
  inputValidator.ratingValidator,
  checkIfArticleExists,
  tryCatchWrapper(Article.rateArticle)
);

router.get('/articles',
  tryCatchWrapper(Article.getArticles));

router.get(
  '/articles/trending',
  tryCatchWrapper(Article.getTrendingArticles),
);

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
  '/articles/search',
  inputValidator.searchValidator,
  tryCatchWrapper(Article.searchArticle)
);

router.get('/articles/:slug',
  validator.validateSlug,
  isAuthenticated,
  tryCatchWrapper(Article.getArticle));

router.get(
  '/articles/:slug/comments',
  checkIfArticleExists,
  tryCatchWrapper(Comment.getComments),
);

router.get(
  '/articles/:slug/comments/:id',
  isAuthenticated,
  inputValidator.validateCommentParam,
  isAuthorized.comment,
  tryCatchWrapper(Comment.getCommentWithHistory),
);
router.delete(
  '/articles/:slug',
  isAuthenticated,
  validator.validateSlug,
  checkIfArticleExists,
  tryCatchWrapper(Article.deleteArticle)
);
router.post(
  '/articles/:slug/comments/:id/reactions',
  isAuthenticated,
  validator.validateReaction,
  checkIfArticleExists,
  tryCatchWrapper(Reactions.likeComment),
);
router.get('/articles/:slug', validator.validateSlug, tryCatchWrapper(Article.getArticle));

router.delete(
  '/articles/:slug/comments/:id',
  isAuthenticated,
  checkPermissions,
  validator.validateCommentParams,
  checkIfArticleExists,
  tryCatchWrapper(Comment.deleteComment),
);

router.patch(
  '/articles/:slug',
  isAuthenticated,
  inputValidator.articleValidator,
  checkIfArticleExists,
  isAuthorized.checkAuthor,
  tryCatchWrapper(Article.updateArticle),
);
export default router;
