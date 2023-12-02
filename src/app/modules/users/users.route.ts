import express from "express";
import { UsersController } from "./users.controller";

const router = express.Router();

// For users
router.post("/users", UsersController.createUsers);
router.get("/users", UsersController.getAllUsers);
router.get("/users/:userId", UsersController.getSingleUser);
router.delete("/users/:userId", UsersController.deleteUser);
router.put("/users/:userId", UsersController.updateUser);

// For Orders
router.put("/users/:userId/orders", UsersController.addProduct);
router.get("/users/:userId/orders", UsersController.getOrderOfUser);
router.get(
  "/users/:userId/orders/total-price",
  UsersController.getTotalPriceOfOrder
);

export const UsersRoutes = router;
