import express from "express";
import { UsersController } from "./users.controller";

const router = express.Router();

router.post("/users", UsersController.createUsers);
router.get("/users", UsersController.getAllUsers);

export const UsersRoutes = router;
