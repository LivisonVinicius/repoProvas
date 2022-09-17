import { client } from "../database";
import { IUserType } from "../types/userType";

export async function insert(user: IUserType) {
  await client.user.create({ data: user });
  return;
}

export async function findByEmail(email: string) {
  const user = await client.user.findFirst({ where: { email } });
  return user;
}

export async function findById(id: number) {
  const user = await client.user.findFirst({ where: { id } });
  return user;
}
