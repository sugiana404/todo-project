import type { Response, Request, NextFunction } from "express";
import { createUserService, loginService } from "./auth.service.js";
import { formatResponse, MethodType } from "../../utils/response.format.js";
import Joi from "joi";
import { BadRequestError } from "../../utils/error.types.js";
import { validateInput } from "../../utils/joi.validation.js";

const usernameSchema = Joi.string().min(7).required();
const passwordSchema = Joi.string().min(7).required();

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await validateInput(
      req,
      res,
      next,
      Joi.object({
        username: usernameSchema,
        password: passwordSchema,
      })
    );

    const { username, password } = req.body;
    const newUser = await createUserService(username, password);
    formatResponse(res, 201, MethodType.Create, newUser);
  } catch (error) {
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    await validateInput(
      req,
      res,
      next,
      Joi.object({ username: usernameSchema, password: passwordSchema })
    );
    const { username, password } = req.body;
    const data = await loginService(username, password);
    formatResponse(res, 200, MethodType.Create, data);
  } catch (error) {
    next(error);
  }
}
