import express from "express";
import { UsersController } from "./users.controller";

const router = express.Router();

router.post("/users", UsersController.createUsers);
router.get("/users", UsersController.getAllUsers);
router.get("/users/:userId", UsersController.getSingleUser);
router.delete("/users/:userId", UsersController.deleteUser);

export const UsersRoutes = router;
