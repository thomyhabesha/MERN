import 'express-async-errors';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv'
dotenv.config();
import express from 'express'
const app= express()
app.use(express.json());
import morgan from 'morgan'
import mongoose from 'mongoose';
import jobsRouter from './routes/jobsRouter.js';
import authRoute from './routes/authRoute.js';
import userRoute from './routes/userRoute.js';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import {authenticateUser} from './middleware/authMiddleware.js';


if (process.env.NODE_ENV==="development"){
app.use(morgan('dev'))
}


app.get('/api/v1/test', (req, res) => {
    res.json({ msg: 'test route' });
  });

  
app.use(cookieParser())
app.use('/api/v1/jobs',authenticateUser, jobsRouter);
app.use('/api/v1/users',authenticateUser, userRoute);
app.use('/api/v1/auth', authRoute);


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


