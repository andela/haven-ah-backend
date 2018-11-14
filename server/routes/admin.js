import { Router } from 'express';
import User from '../controllers/user';
import isAuthenticated from '../middlewares/checkAuth';

import tryCatchWrapper from '../utilities/tryCatchWrapper';
import validator from '../middlewares/paramChecker';
import checkPermissions from '../middlewares/checkPermissions';

const router = new Router();

router.put('/admin/users/roles',
  isAuthenticated,
  checkPermissions,
  validator.validateRoleUpdate,
  tryCatchWrapper(User.updateUserRole));

export default router;
