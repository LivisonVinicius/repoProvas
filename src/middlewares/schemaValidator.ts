import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";
import schemas from "../schemas/schemas";

type SchemasType = keyof typeof schemas;

export default function schemaValidator(schema: SchemasType) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schemas[schema].validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errorMessage = error.details.map((detail) => detail.message);
      throw { type: "Unprocessable Entity", message: errorMessage };
    }
    return next();
  };
}
