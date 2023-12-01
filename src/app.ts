import express, { Application, Request, Response } from "express";
import cors from "cors";
import { UsersRoutes } from "./app/modules/users/users.route";
const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

// application routes:
app.use("/api", UsersRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world!");
});

export default app;
