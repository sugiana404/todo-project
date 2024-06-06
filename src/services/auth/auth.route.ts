import { Router } from "express";
import { createUser, login } from "./auth.controller.js";

const authRouter = Router();

authRouter.post("/create", createUser);
authRouter.post("/login", login);

export { authRouter };
