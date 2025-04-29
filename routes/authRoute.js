import express from 'express'
const router= express()
import {register, login, logout} from '../controllers/authController.js'
import { validateRegisterInput, validateLoginInput } from '../middleware/validationMiddleware.js';
import rateLimiter from 'express-rate-limit';

//makes user retry after 15 min if incorrect for max 8 try
const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 8,
  message: { msg: 'IP rate limit exceeded, retry in 15 minutes.' },
});


router.post('/register', apiLimiter, validateRegisterInput, register);
router.post('/login', apiLimiter, validateLoginInput, login);
router.get('/logout',  logout);

export default router;
