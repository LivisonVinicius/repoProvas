import { client } from "../database";

export async function getTeacherDiscipline(
  teacherId: number,
  disciplineId: number
) {
  const teacherDiscipline = await client.teachersDisciplines.findFirst({
    where: {
      teacherId,
      disciplineId,
    },
  });
  return teacherDiscipline;
}
