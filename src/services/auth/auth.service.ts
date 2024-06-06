import type { Model } from "sequelize";
import { User } from "./auth.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { BadRequestError, DataNotFoundError } from "../../utils/error.types.js";

export async function createUserService(username: string, password: string) {
  try {
    const isUserExist = await User.findOne({ where: { username: username } });
    if (isUserExist !== null) {
      throw new BadRequestError("Username have been used", {
        resourceType: "User",
        resourceId: username,
      });
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

export async function loginService(
  username: string,
  password: string
): Promise<{}> {
  try {
    const user = await User.findOne({ where: { username: username } });
    if (user === null) {
      throw new DataNotFoundError("Username not registered", {
        resourceType: "User",
        resourceId: username,
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new BadRequestError("Username or password is wrong", {
        resourceType: "User",
      });
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
    console.log(`error : ${error}`);
    throw error;
  }
}
