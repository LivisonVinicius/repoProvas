import { Test } from "@prisma/client";

export type ITestType = Omit<Test, "id">;
