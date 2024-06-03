import { Router } from "express";
import { createUser } from "./user.controller.js";

const userRouter = Router();

userRouter.post("/create", createUser);

export { userRouter };
