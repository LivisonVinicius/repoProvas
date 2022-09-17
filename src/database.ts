import pkg from "@prisma/client";

const { PrismaClient } = pkg;

export const client = new PrismaClient();