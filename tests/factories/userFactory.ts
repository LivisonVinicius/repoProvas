import { faker } from "@faker-js/faker";
import { client } from "../../src/database";
import { generate } from "generate-password";
import bcrypt from "bcrypt";

export async function generateUser() {
  const password = generate({
    length: 10,
    numbers: true,
    lowercase: true,
    uppercase: true,
    symbols: true,
  });

  const user = {
    email: faker.internet.email(),
    password: password,
    confirmPassword: password,
  };

  return user;
}

export async function insertUser(user: {
  password: string;
  confirmPassword: string;
  email: string;
}) {
  const passwordHash = await bcrypt.hash(user.password, 10);
  return await client.user.create({
    data: {
      email: user.email,
      password: passwordHash,
    },
  });
}
