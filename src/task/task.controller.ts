import type { Response, Request, NextFunction } from "express";
import {
  createTaskService,
  deleteTaskService,
  getAllTaskService,
  updateTaskService,
} from "./task.service.js";
import { formatResponse, MethodType } from "../utils/response.format.js";
import { BadRequestError } from "../utils/error.types.js";

export async function getAllTask(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const uid = req.uid;
    const tasks = await getAllTaskService(uid);

    formatResponse(res, 200, MethodType.Read, tasks);
  } catch (error) {
    next(error);
  }
}

export async function createTask(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const uid = req.uid;
    const { task, dueDate, status } = req.body;

    if (uid === undefined) {
      throw new BadRequestError("uid can't be empty");
    }

    const newTask = await createTaskService(uid, task, dueDate, status);
    formatResponse(res, 201, MethodType.Create, newTask);
  } catch (error) {
    next(error);
  }
}

export async function updateTask(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const uid = req.uid;
    const { taskId, task, status, dueDate } = req.body;
    const updatedTask = await updateTaskService(
      uid,
      taskId,
      task,
      status,
      dueDate
    );
    formatResponse(res, 201, MethodType.Update, updatedTask);
  } catch (error) {
    next(error);
  }
}

export async function deleteTask(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const uid = req.uid;
    const { taskId } = req.body;
    const deletedTask = await deleteTaskService(uid, taskId);

    formatResponse(res, 201, MethodType.Delete, deletedTask);
  } catch (error) {
    next(error);
  }
}
