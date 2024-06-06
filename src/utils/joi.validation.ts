import type { Request, Response, NextFunction } from "express";
import type { ValidationResult } from "joi";
import type Joi from "joi";
import { BadRequestError } from "./error.types.js";

export async function validateInput(
  req: Request,
  res: Response,
  next: NextFunction,
  schema: Joi.ObjectSchema<any>
): Promise<void> {
  try {
    const { error }: ValidationResult<any> = schema.validate(req.body);
    if (error) {
      throw new BadRequestError("JOI Validation Error", {
        errorValue: error.details[0]?.message,
      });
    }
  } catch (error) {
    next(error);
  }
}
