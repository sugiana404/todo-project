import type { Response, Request, NextFunction } from "express";
import { createUserService } from "./user.service.js";

async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, password } = req.body;
    await createUserService(username, password);
    res.send("User created!");
  } catch (error) {
    res.send(`${error}`);
  }
}

export { createUser };
