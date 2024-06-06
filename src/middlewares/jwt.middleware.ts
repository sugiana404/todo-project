import jwt, { type JwtPayload } from "jsonwebtoken";
import { type Request, type Response, type NextFunction } from "express";
import { BadRequestError } from "../utils/error.types.js";

interface MyJwtPayLoad extends JwtPayload {
  uid: number;
}

declare global {
  namespace Express {
    interface Request {
      uid: number;
    }
  }
}

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
    }

    jwt.verify(token, "secret", (err, decoded) => {
      if (err) {
        throw new BadRequestError("Token expired or invalid", {
          resourceType: "Auth",
          resourceValue: token,
        });
      }

      req.uid = (decoded as MyJwtPayLoad)?.id;
      next();
    });
  } catch (error) {
    next(error);
  }
}
