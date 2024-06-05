import jwt, { type JwtPayload } from "jsonwebtoken";
import { type Request, type Response, type NextFunction } from "express";
import { BadRequestError } from "../utils/error.types.js";

interface MyJwtPayLoad extends JwtPayload {
  uid?: number;
}

declare global {
  namespace Express {
    interface Request {
      uid?: number;
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
    } else {
      console.log(
        `token payload: ${JSON.stringify(jwt.verify(token, "secret"))}`
      );
      jwt.verify(token, "secret", (err, decoded) => {
        if (err) {
          return res
            .status(401)
            .json({ error: "Failed to authenticate token" });
        }

        req.uid = (decoded as MyJwtPayLoad)?.id;
        next();
      });
    }
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ error: "Unauthorized" });
    } else {
      next(error);
    }
  }
}
