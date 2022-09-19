import { client } from "../database";
import { ITestType } from "../types/testType";

export async function insertTest(data: ITestType) {
  const testInserted = await client.test.create({ data: data });
  return testInserted;
}

export async function getTestsFromDiscipline() {
  const terms = await client.term.findMany({
    select: {
      number: true,
      discipline: {
        select: {
          id: true,
          name: true,
          teachersDiscipline: true,
        },
      },
    },
  });
  return terms;
}
