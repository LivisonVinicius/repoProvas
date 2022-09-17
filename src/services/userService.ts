import jwt from "jsonwebtoken";
import { IUserType } from "../types/userType";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import * as userRepository from "../repositories/userRepository";

dotenv.config();

export async function registerUser(user: IUserType) {
  const existUser = await userRepository.findByEmail(user.email);
  if (existUser) {
    throw { type: "Conflict", message: "Email already in use" };
  }
  user.password = bcrypt.hashSync(user.password, 10);
  await userRepository.insert({ email: user.email, password: user.password });
  return;
}

export async function loginUser(user: IUserType) {
  const existUser = await userRepository.findByEmail(user.email);
  if (!existUser) {
    throw { type: "Unauthorized", message: "Password or Email wrong" };
  }
  if (!bcrypt.compareSync(user.password, existUser.password)) {
    throw { type: "Unauthorized", message: "Password or Email wrong" };
  }
  const token = jwt.sign({ id: existUser.id }, process.env.SECRET_TOKEN!, {
    expiresIn: "1d",
  });
  return token;
}
