import type { Model } from "sequelize";
import { User } from "./user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../utils/error.types.js";

async function createUserService(username: string, password: string) {
  try {
    const isUserExist = await User.findOne({ where: { username: username } });
    if (isUserExist !== null) {
      throw new BadRequestError("username have been used");
    }

    const saltRounds = 10;
    const encryptedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      username: username,
      password: encryptedPassword,
    });
    return newUser;
  } catch (error) {
    throw error;
  }
}

async function getAllUserService(): Promise<Model<any, any>[]> {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

async function loginService(username: string, password: string): Promise<{}> {
  try {
    const user = await User.findOne({ where: { username: username } });
    if (user === null) {
      throw new Error("User didn't exists");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new Error("Username or password is wrong");
    }
    var token = jwt.sign({ id: user.id, username: user.username }, "secret", {
      expiresIn: "1h",
    });

    var data = {
      uid: user.id,
      token: token,
    };
    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

export { createUserService, getAllUserService, loginService };
