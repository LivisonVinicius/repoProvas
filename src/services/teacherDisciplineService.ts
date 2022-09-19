import * as teacherDisciplineRepository from "../repositories/teacherDisciplineRepository";

export async function getTeacherDiscipline(
  teacherId: number,
  disciplineId: number
) {
  const teacherDiscipline =
    await teacherDisciplineRepository.getTeacherDiscipline(
      teacherId,
      disciplineId
    );
  return teacherDiscipline;
}
