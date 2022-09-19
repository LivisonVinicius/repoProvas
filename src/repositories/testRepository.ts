import { client } from "../database";
import { ITestType } from "../types/testType";

export async function insertTest(data: ITestType) {
  const testInserted = await client.test.create({ data: data });
  return testInserted;
}
