import { Request, Response } from "express";
import { UsersServices } from "./users.service";

const createUsers = async (req: Request, res: Response) => {
  try {
    const { user: usersData } = req.body;
    // It'll call service function for sending data
    const result = await UsersServices.createUsersIntoDB(usersData);
    // It'll send response
    res.status(200).json({
      success: true,
      message: "User created successfully!",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UsersServices.getAllUsersFromDB();
    // It'll send response
    res.status(200).json({
      success: true,
      message: "Users fetched successfully!",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UsersServices.getSingleUserFromDB(Number(userId));
    res.status(200).json({
      success: true,
      message: "User fetched successfully!",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const UsersController = {
  createUsers,
  getAllUsers,
  getSingleUser,
};
