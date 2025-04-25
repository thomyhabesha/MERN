import mongoose from 'mongoose';
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



export const updateJob = async (req, res) => {
    const { id } = req.params;
  
    const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
      new: true,
    });
  
    if (!updatedJob) {
      return res.status(404).json({ msg: `no job with id ${id}` });
    }
  
    res.status(200).json({ job: updatedJob });
  };


export const deleteJob= async (req, res)=> {
    const {id}= req.params;
   const removedJob=await Job.findByIdAndDelete(id);

res.status(StatusCodes.OK).json({msg: 'job deleted successfully', job:removedJob});
}

export const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$jobStatus', count: { $sum: 1 } } },
  ]);
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});






  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 },
  ]);
  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      const date = day()
        .month(month - 1)
        .year(year)
        .format('MMM YY');
      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};