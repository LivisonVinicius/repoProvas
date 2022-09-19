import { ObjectSchema } from "joi";

import { registerSchema, loginSchema } from "./authSchemas";
import testSchema from "./testSchema";

const schemas: { [key: string]: ObjectSchema } = {
  registerSchema,
  loginSchema,
  testSchema,
};

export default schemas;
