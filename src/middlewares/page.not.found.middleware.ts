import type { Request, Response, NextFunction } from "express";
import { ResourceNotFoundError } from "../utils/error.types.js";

export function notFoundMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const error = new ResourceNotFoundError("Resource Not Found");
  res.status(404).json({ error: error.message });
}
