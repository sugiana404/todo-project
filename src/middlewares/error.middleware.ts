import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/error.types.js";
import { formatError } from "../utils/error.format.js";

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    const statusCode = error.statusCode;
    const errorCode = error.errorCode;
    const errorMessage = error.message;
    const errorDetails = error.details;

    return res
      .status(statusCode)
      .json(formatError(errorCode, errorMessage, errorDetails));
  } else {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
