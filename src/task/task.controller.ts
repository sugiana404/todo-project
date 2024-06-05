import type { Response, Request, NextFunction } from "express";
import { createTaskService } from "./task.service.js";
import { formatResponse, MethodType } from "../utils/response.format.js";

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    // get task data
    res.status(200).json({ status: "succes" });
  } catch (error) {
    next(error);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { uid, task, dueDate, status } = req.body;

    const newTask = await createTaskService(uid, task, dueDate, status);
    formatResponse(res, 201, MethodType.Create, newTask);
  } catch (error) {
    next(error);
  }
}
