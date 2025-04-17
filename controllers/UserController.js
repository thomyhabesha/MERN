import { StatusCodes } from "http-status-codes"
import User from "../models/UserModel.js"
import Jobs from "../models/JobsModel.js";

export const getCurrentUser= async (req, res) =>{
    const user= await User.findById(req.user.userId);
    const userWithoutPassword= user.toJSON();
    res.status(StatusCodes.OK).json({user: userWithoutPassword})
}
export const getApplicationStatus= async (req, res) =>{
    const users=await User.countDocuments();
    const jobs=await Jobs.countDocuments();
    res.status(StatusCodes.OK).json({ users, jobs });
}
export const updateUser= async (req, res) =>{
   const updatedUser= await User.findByIdAndUpdate(req.user.userId, req.body, {new: true  });
    res.status(StatusCodes.OK).json({msg: "update User", updatedUser: updatedUser})
}