import { Router } from "express";
import { createTest, getTestDiscipline } from "../controllers/testControllers";
import schemaValidator from "../middlewares/schemaValidator";
import validateToken from "../middlewares/validateToken";

const testRouter = Router();

testRouter.post(
  "/test",
  validateToken,
  schemaValidator("testSchema"),
  createTest
);

testRouter.get("/test/discipline", validateToken, getTestDiscipline);

export default testRouter;
