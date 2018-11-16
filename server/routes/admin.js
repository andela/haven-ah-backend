import { Router } from 'express';
import User from '../controllers/user';
import isAuthenticated from '../middlewares/checkAuth';
import Article from '../controllers/article';
import tryCatchWrapper from '../utilities/tryCatchWrapper';
import validator from '../middlewares/paramChecker';
import checkPermissions from '../middlewares/checkPermissions';
import Complaint from '../controllers/complaint';


const router = new Router();

router.put('/admin/users/roles',
  isAuthenticated,
  checkPermissions,
  validator.validateRoleUpdate,
  tryCatchWrapper(User.updateUserRole));

router.get('/admin/users/complaints',
  isAuthenticated,
  checkPermissions,
  tryCatchWrapper(Complaint.getComplaints));

router.put('/admin/users/complaints/:complaintId/reply',
  isAuthenticated,
  checkPermissions,
  tryCatchWrapper(Complaint.replyComplaints));


router.put('/admin/articles/featured',
  isAuthenticated,
  checkPermissions,
  tryCatchWrapper(Article.selectFeaturedArticle));

router.put('/admin/authors/:username',
  validator.validateUsername,
  isAuthenticated,
  checkPermissions,
  tryCatchWrapper(User.setFeaturedAuthor));
router.get('/admin/articles/archived',
  isAuthenticated, checkPermissions,
  tryCatchWrapper(Article.getDeletedArticles));

router.put('/admin/articles/:slug/restore',
  isAuthenticated, checkPermissions,
  tryCatchWrapper(Article.restoreDeletedArticle));


export default router;
