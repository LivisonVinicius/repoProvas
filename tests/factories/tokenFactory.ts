import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { generateUser, insertUser } from "./userFactory";

dotenv.config();

export async function generateToken() {
  const user = await generateUser();
  const insertedUser = await insertUser(user);
  const token = jwt.sign({ id: insertedUser.id }, process.env.SECRET_TOKEN!, {
    expiresIn: "1d",
  });
  return token;
}
