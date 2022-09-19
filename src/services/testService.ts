import * as categoryService from "../services/categoryService";
import * as teacherService from "../services/teacherService";
import * as disciplineService from "../services/disciplineService";
import * as testRepository from "../repositories/testRepository";
import * as teacherDisciplineRepository from "../repositories/teacherDisciplineRepository";
interface ITest {
  name: string;
  pdfUrl: string;
  categoryId: number;
  teacherId: number;
  disciplineId: number;
}

export async function createTest(data: ITest) {
  const { name, pdfUrl, categoryId, teacherId, disciplineId } = data;

  const category = await categoryService.getCategoryById(categoryId);
  if (!category) throw { type: "Not found", message: "Category not found" };

  const teacher = await teacherService.getTeacherById(teacherId);
  if (!teacher) throw { type: "Not found", message: "Teacher not found" };

  const discipline = await disciplineService.getDisciplineById(disciplineId);
  if (!discipline) throw { type: "Not found", message: "Discipline not found" };

  const teacherDiscipline =
    await teacherDisciplineRepository.getTeacherDiscipline(
      teacherId,
      disciplineId
    );
    if(!teacherDiscipline) throw {type: "Not found", message: "This relation of discipline and teacher does not exist"}

  const test = await testRepository.insertTest({
    name,
    pdfUrl,
    categoryId,
    teachersDisciplinesId: teacherDiscipline.id,
  });

  return
}
