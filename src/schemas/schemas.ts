import { ObjectSchema } from "joi";

import { registerSchema, loginSchema } from "./authSchemas";

const schemas: { [key: string]: ObjectSchema } = {
  registerSchema,
  loginSchema,
};

export default schemas;
