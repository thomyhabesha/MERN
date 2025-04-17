import express from 'express'
import { getApplicationStatus, getCurrentUser, updateUser } from '../controllers/UserController.js';
import { validateUpdateUserInput } from '../middleware/validationMiddleware.js';
import { authorizePermissions } from '../middleware/authMiddleware.js';
const router=express();

router.get('/Current-user', getCurrentUser)
router.get('/admin/app-stats', [
    authorizePermissions('admin'),
    getApplicationStatus,
  ]);
router.patch('/update-user',validateUpdateUserInput, updateUser)

export default router; 