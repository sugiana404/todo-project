import { Router } from "express";
import { jwtValidator } from "../middlewares/jwt.middleware.js";
import { create, getAll } from "./task.controller.js";

const taskRouter = Router();

taskRouter.get("/getAll", jwtValidator, getAll);
taskRouter.post("/create", jwtValidator, create);

export { taskRouter };
