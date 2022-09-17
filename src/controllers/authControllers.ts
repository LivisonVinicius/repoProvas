import { Request, Response } from "express";
import { IUserType } from "../types/userType";
import * as userService from "../services/userService";

export async function register(req: Request, res: Response) {
  const user: IUserType = req.body;
  await userService.registerUser(user);
  return res.status(201).send("User created successfully!");
}

export async function login(req: Request, res: Response) {
  const user: IUserType = req.body;
  const token = await userService.loginUser(user);
  return res.status(201).send(token);
}
