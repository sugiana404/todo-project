import { Router } from "express";
import { jwtValidator } from "../../middlewares/jwt.middleware.js";
import {
  createTask,
  deleteTask,
  getAllTask,
  getFilteredTask,
  updateTask,
} from "./task.controller.js";

const taskRouter = Router();

taskRouter.get("/getAll", jwtValidator, getAllTask);
taskRouter.post("/create", jwtValidator, createTask);
taskRouter.put("/update", jwtValidator, updateTask);
taskRouter.delete("/delete", jwtValidator, deleteTask);
taskRouter.get("/getFilteredTask", jwtValidator, getFilteredTask);

export { taskRouter };
