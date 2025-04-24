import express from 'express'
import { getApplicationStatus, getCurrentUser, updateUser } from '../controllers/UserController.js';
import { validateUpdateUserInput, checkForTestUser } from '../middleware/validationMiddleware.js';
import { authorizePermissions } from '../middleware/authMiddleware.js';
import upload from '../middleware/multerMiddleware.js';

const router=express();

router.get('/current-user', getCurrentUser)
router.get('/admin/app-stats', [
    authorizePermissions('admin'),
    getApplicationStatus,
  ]);
router.patch('/update-user', checkForTestUser, upload.single('avatar'), validateUpdateUserInput, updateUser)

export default router; 