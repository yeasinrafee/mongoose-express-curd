import express from "express";
import { UsersController } from "./users.controller";

const router = express.Router();

router.post("/users", UsersController.createUsers);
router.get("/users", UsersController.getAllUsers);
router.get("/users/:userId", UsersController.getSingleUser);

export const UsersRoutes = router;
