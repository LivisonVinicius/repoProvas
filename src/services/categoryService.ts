import * as categoryRepository from "../repositories/categoryRepository";

export async function getCategoryById(id: number) {
  const category = await categoryRepository.getCategoryById(id);
  return category;
}
