/*
  Warnings:

  - A unique constraint covering the columns `[teacherId,disciplineId]` on the table `teachersDisciplines` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "_CategoryToDiscipline" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToDiscipline_AB_unique" ON "_CategoryToDiscipline"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToDiscipline_B_index" ON "_CategoryToDiscipline"("B");

-- CreateIndex
CREATE UNIQUE INDEX "teachersDisciplines_teacherId_disciplineId_key" ON "teachersDisciplines"("teacherId", "disciplineId");

-- AddForeignKey
ALTER TABLE "_CategoryToDiscipline" ADD CONSTRAINT "_CategoryToDiscipline_A_fkey" FOREIGN KEY ("A") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToDiscipline" ADD CONSTRAINT "_CategoryToDiscipline_B_fkey" FOREIGN KEY ("B") REFERENCES "disciplines"("id") ON DELETE CASCADE ON UPDATE CASCADE;
