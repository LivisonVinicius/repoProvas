import { client } from "../database";

export async function getTeacherById(id: number) {
  const category = await client.teacher.findFirst({
    where: { id },
  });
  return category;
}
