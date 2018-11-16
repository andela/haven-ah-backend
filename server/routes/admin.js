import { Router } from 'express';
import User from '../controllers/user';
import isAuthenticated from '../middlewares/checkAuth';
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

export default router;
