import * as disciplineRepository from "../repositories/disciplineRepository";

export async function getDisciplineById(id: number) {
  const discipline = await disciplineRepository.getDisciplineById(id);
  return discipline;
}
