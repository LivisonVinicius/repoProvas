import { Request, Response } from "express";
import * as testService from "../services/testService";

export async function createTest(req: Request, res: Response) {
  const test = req.body;
  await testService.createTest(test);

  res.status(201).send("Test created!!")
}
