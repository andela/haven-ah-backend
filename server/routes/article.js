import { Router } from 'express';
import Article from '../controllers/article';
import inputValidator from '../middlewares/validations';
import isAuthenticated from '../middlewares/checkAuth';

const router = new Router();

router.post(
  '/articles',
  isAuthenticated,
  inputValidator.articleValidator,
  Article.createArticle
);

router.get('/articles', Article.getArticles);

export default router;
