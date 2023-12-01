import express from "express";
import { UsersController } from "./users.controller";

const router = express.Router();

router.post("/users", UsersController.createUsers);

export const UsersRoutes = router;
