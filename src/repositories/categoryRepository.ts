import { client } from "../database";

export async function getCategoryById(id: number) {
  const category = await client.category.findFirst({
    where: { id },
  });
  return category;
}