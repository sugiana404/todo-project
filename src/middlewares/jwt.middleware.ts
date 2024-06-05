import jwt from "jsonwebtoken";
import { type Request, type Response, type NextFunction } from "express";
import { BadRequestError, UnauthorizedError } from "../utils/error.types.js";

export async function jwtValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.trim().split(" ")[1];

    if (!token) {
      throw new BadRequestError("Token not provided");
    } else {
      jwt.verify(token, "secret");
    }

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ error: "Unauthorized" });
    } else {
      next(error);
    }
  }
}
