import { Router } from "express";
import { createUser, getAllUser, login } from "./user.controller.js";

const userRouter = Router();

userRouter.post("/create", createUser);
userRouter.get("/getAll", getAllUser);
userRouter.post("/login", login);

export { userRouter };
