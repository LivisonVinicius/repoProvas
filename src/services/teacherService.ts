import * as teacherRepository from "../repositories/teacherRepository";

export async function getTeacherById(id: number) {
  const teacher = await teacherRepository.getTeacherById(id);

  return teacher;
}
