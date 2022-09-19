import { client } from "../database";

export async function getDisciplineById(id: number) {
  const discipline = await client.discipline.findFirst({
    where: { id },
  });
  return discipline;
}
