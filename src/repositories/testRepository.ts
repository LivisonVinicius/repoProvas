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

  const categories = await client.category.findMany({
    select: {
      id: true,
      name: true,
      tests: {
        include: {
          TeachersDisciplines: {
            select: {
              disciplineId: true,
              Teacher: {
                select: {
                  name: true,
                  id: true,
                },
              },
            },
          },
        },
      },
    },
  });

  const testCategory = terms.map((term) => {
    return {
      term: term.number,
      disciplines: term.discipline.map((discipline) => {
        return {
          id: discipline.id,
          name: discipline.name,
          categories: categories
            .map((category) => {
              return {
                id: category.id,
                name: category.name,
                tests: category.tests
                  .map((test) => {
                    if (test.TeachersDisciplines.disciplineId === discipline.id)
                      return {
                        id: test.id,
                        name: test.name,
                        teacherName: test.TeachersDisciplines.Teacher.name,
                        pdfUrl: test.pdfUrl,
                      };
                  })
                  .filter((testExists) => testExists),
              };
            })
            .filter((categoryExists) => categoryExists.tests.length > 0),
        };
      }),
    };
  });

  return testCategory;
}
