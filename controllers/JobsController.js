import Job from '../models/JobsModel.js';
import {StatusCodes} from 'http-status-codes'



export const getAllJobs= async (req, res)=>{
    const job= await Job.find({createdBy: req.user.userId}) 
    res.status(StatusCodes.OK).json({job});
}


export const getJob= async (req, res)=>{
    const {id}= req.params;
    const job= await Job.findById(id) 
 res.status(StatusCodes.OK).json({job})    
}


export const createJobs = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({ job });
  };


export const updateJob= async (req, res)=>{
    const {company, position}=req.body;
    const id= req.params.id;
    const updatedJob= await Job.findByIdAndUpdate(
        id, 
       { company:company, position: position},
       {new: true}
)
    
 res.status(StatusCodes.OK).json({msg:'job updated successfully', job: updatedJob});
}


export const deleteJob= async (req, res)=> {
    const {id}= req.params;
   const removedJob=await Job.findByIdAndDelete(id);

res.status(StatusCodes.OK).json({msg: 'job deleted successfully', job:removedJob});
}

