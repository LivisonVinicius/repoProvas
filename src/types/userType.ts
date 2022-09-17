import { User } from "@prisma/client";

export type IUserType = Omit<User, "id">;
