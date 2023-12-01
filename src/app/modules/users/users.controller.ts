import { Request, Response } from "express";
import { UsersServices } from "./users.service";
import { usersValidationSchema } from "./users.validation";

const createUsers = async (req: Request, res: Response) => {
  try {
    const { user: usersData } = req.body;

    // Data validation using zod
    const zodParsedData = usersValidationSchema.parse(usersData);
    // It'll call service function for sending data
    const result = await UsersServices.createUsersIntoDB(zodParsedData);
    // It'll send response
    res.status(200).json({
      success: true,
      message: "User created successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "User not found",
      error: err,
    });
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
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "User not found",
      error: err,
    });
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
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { user: usersData } = req.body;

    // Data validation using zod
    const zodParsedUpdatedData = usersValidationSchema.parse(usersData);

    const result = await UsersServices.updateUserFromDB(
      Number(userId),
      zodParsedUpdatedData
    );
    res.status(200).json({
      success: true,
      message: "User updated successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    await UsersServices.deleteUserFromDB(Number(userId));
    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: null,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};

export const UsersController = {
  createUsers,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
