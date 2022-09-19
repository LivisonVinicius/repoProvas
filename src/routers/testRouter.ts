import { Router } from "express";
import { createTest } from "../controllers/testControllers";
import schemaValidator from "../middlewares/schemaValidator";
import validateToken from "../middlewares/validateToken";

const testRouter = Router();

testRouter.post(
  "/test",
  validateToken,
  schemaValidator("testSchema"),
  createTest
);

export default testRouter;
