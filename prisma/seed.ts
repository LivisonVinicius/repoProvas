import { client } from "../src/database";

async function main() {
  const termsArr = [
    { number: 1 },
    { number: 2 },
    { number: 3 },
    { number: 4 },
    { number: 5 },
    { number: 6 },
  ];

  await client.$transaction(
    termsArr.map((term) =>
      client.term.upsert({ where: term, update: {}, create: term })
    )
  );

  const categoriesArr = [
    { name: "Projeto" },
    { name: "Prática" },
    { name: "Recuperação" },
  ];

  await client.$transaction(
    categoriesArr.map((category) =>
      client.category.upsert({ where: category, update: {}, create: category })
    )
  );

  const teachersArr = [{ name: "Diego Pinho" }, { name: "Bruna Hamori" }];

  await client.$transaction(
    teachersArr.map((teacher) =>
      client.teacher.upsert({ where: teacher, update: {}, create: teacher })
    )
  );

  const disciplinesArr = [
    { name: "HTML e CSS", termId: 1 },
    { name: "JavaScript", termId: 2 },
    { name: "React", termId: 3 },
    { name: "Planejamento", termId: 2 },
  ];

  await client.$transaction(
    disciplinesArr.map((discipline) =>
      client.discipline.upsert({
        where: { name: discipline.name },
        update: {},
        create: discipline,
      })
    )
  );

  const teachersDisciplinesArr = [
    { teacherId: 1, disciplineId: 1 },
    { teacherId: 2, disciplineId: 2 },
    { teacherId: 2, disciplineId: 3 },
    { teacherId: 1, disciplineId: 4 },
  ];

  await client.$transaction(
    teachersDisciplinesArr.map((teachersDiscipline) =>
      client.teachersDisciplines.upsert({
        where: {
          teacher_discipline: {
            teacherId: teachersDiscipline.teacherId,
            disciplineId: teachersDiscipline.disciplineId,
          },
        },
        update: {},
        create: teachersDiscipline,
      })
    )
  );
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    client.$disconnect();
  });
