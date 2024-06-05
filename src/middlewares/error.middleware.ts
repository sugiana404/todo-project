import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/error.types.js";

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ error: error.message });
  } else {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
