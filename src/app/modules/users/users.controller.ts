import { Request, Response } from "express";
import { UsersServices } from "./users.service";
import { usersValidationSchema } from "./users.validation";

// create a new user
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

// get all users from database
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UsersServices.getAllUsersFromDB();

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

// get a single user
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

// update a user
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

// delete user from database
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

//// For Order management

// Add products to order
const addProduct = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { orders: orderData } = req.body;
    await UsersServices.addProductToOrder(Number(userId), orderData);
    res.status(200).json({
      success: true,
      message: "Order created successfully!",
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

// get order for specific user
const getOrderOfUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UsersServices.getOrderOfUser(Number(userId));
    res.status(200).json({
      success: true,
      message: "Order fetched successfully!",
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

// calculate the total price of ordered products
const getTotalPriceOfOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const totalPrice = await UsersServices.getTotalPriceOfOrder(Number(userId));
    res.status(200).json({
      success: true,
      message: "Total price calculated successfully!",
      data: { totalPrice },
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
  addProduct,
  getOrderOfUser,
  getTotalPriceOfOrder,
};
