import { Router } from "express";
const router= Router();
import {getAllJobs, getJob, updateJob, deleteJob, createJobs} from '../controllers/JobsController.js'
import { validateIdParam, validateJobInput } from '../middleware/validationMiddleware.js';

router.route('/').get(getAllJobs).post(validateJobInput, createJobs);

router
  .route('/:id')
  .get(validateIdParam, getJob)
  .patch(validateIdParam, validateJobInput, updateJob)
  .delete(validateIdParam, deleteJob);


export default router;

  