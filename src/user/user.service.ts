import { User } from "./user.model.js";
import bcrypt from "bcrypt";

async function createUserService(username: string, password: string) {
  try {
    const isUserExist = await User.findOne({ where: { username: username } });
    if (isUserExist !== null) {
      console.log("user already exist");
      throw new Error("User already created");
    }

    const saltRounds = 10;
    const encryptedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      username: username,
      password: encryptedPassword,
    });
  } catch (error) {
    throw new Error(`${error}`);
  }
}

export { createUserService };
