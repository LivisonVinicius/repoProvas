import { Router } from "express";
import {
  createTest,
  getTestDiscipline,
  getTestTeacher,
} from "../controllers/testControllers";
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

testRouter.get("/test/teacher", validateToken, getTestTeacher);

export default testRouter;
