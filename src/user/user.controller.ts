import type { Response, Request, NextFunction } from "express";
import {
  createUserService,
  getAllUserService,
  loginService,
} from "./user.service.js";
import { formatResponse, MethodType } from "../utils/response.format.js";

async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, password } = req.body;
    const newUser = await createUserService(username, password);
    formatResponse(res, 201, MethodType.Create, newUser);
  } catch (error) {
    next(error);
  }
}

async function getAllUser(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await getAllUserService();
    formatResponse(res, 200, MethodType.Read, users);
  } catch (error) {
    next(error);
  }
}

async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, password } = req.body;
    const data = await loginService(username, password);
    formatResponse(res, 200, MethodType.Create, data);
  } catch (error) {
    next(error);
  }
}

export { createUser, getAllUser, login };
