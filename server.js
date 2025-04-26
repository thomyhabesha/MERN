import 'express-async-errors';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv'
dotenv.config();
import express from 'express'
const app= express()
app.use(express.json());
import cloudinary from 'cloudinary';
import morgan from 'morgan'
import mongoose from 'mongoose';
import jobsRouter from './routes/jobsRouter.js';
import authRoute from './routes/authRoute.js';
import userRoute from './routes/userRoute.js';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import {authenticateUser} from './middleware/authMiddleware.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  });

  
if (process.env.NODE_ENV==="development"){
app.use(morgan('dev'))
}

const __dirname = dirname(fileURLToPath(import.meta.url));


app.get('/api/v1/test', (req, res) => {
    res.json({ msg: 'test route' });
  });
  
  
  app.use(cookieParser())
  app.use(express.static(path.resolve(__dirname, './public')));
app.use('/api/v1/jobs',authenticateUser, jobsRouter);
app.use('/api/v1/users',authenticateUser, userRoute);
app.use('/api/v1/auth', authRoute);

//point to frontend 
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public', 'index.html'));
  });

app.use("*",(req,res)=>{
    res.status(404).json({msg: "404 - not found"})
})

app.use(errorHandlerMiddleware);

try {
    await mongoose.connect(process.env.MONGO_URL)
    const port=process.env.PORT || 5100;
    app.listen(port, ()=>{
        console.log(`server running on port ${port}`)
    })
} catch (error) {
    console.log(error)
    process.getMaxListeners(1)
}


