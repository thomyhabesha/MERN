import { Router } from "express";
const router= Router();
import {getAllJobs, getJob, updateJob, deleteJob, createJobs} from '../controllers/JobsController.js'
import { validateIdParam, validateJobInput, checkForTestUser } from '../middleware/validationMiddleware.js';

router.route('/').get(getAllJobs).post(checkForTestUser, validateJobInput, createJobs);

router
  .route('/:id')
  .get(validateIdParam, getJob)
  .patch(checkForTestUser, validateIdParam, validateJobInput, updateJob)
  .delete(checkForTestUser, validateIdParam, deleteJob);


export default router;

  