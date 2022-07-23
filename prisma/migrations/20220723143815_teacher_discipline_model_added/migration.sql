/*
  Warnings:

  - You are about to drop the column `term` on the `disciplines` table. All the data in the column will be lost.
  - You are about to drop the column `disciplineId` on the `tests` table. All the data in the column will be lost.
  - You are about to drop the column `teacherId` on the `tests` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `tests` table. All the data in the column will be lost.
  - Added the required column `termId` to the `disciplines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pdfUrl` to the `tests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacherDisciplineId` to the `tests` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tests" DROP CONSTRAINT "tests_disciplineId_fkey";

-- DropForeignKey
ALTER TABLE "tests" DROP CONSTRAINT "tests_teacherId_fkey";

-- AlterTable
ALTER TABLE "disciplines" DROP COLUMN "term",
ADD COLUMN     "termId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "tests" DROP COLUMN "disciplineId",
DROP COLUMN "teacherId",
DROP COLUMN "url",
ADD COLUMN     "pdfUrl" TEXT NOT NULL,
ADD COLUMN     "teacherDisciplineId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "terms" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,

    CONSTRAINT "terms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teachersDisciplines" (
    "id" SERIAL NOT NULL,
    "teacherId" INTEGER NOT NULL,
    "disciplineId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "teachersDisciplines_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tests" ADD CONSTRAINT "tests_teacherDisciplineId_fkey" FOREIGN KEY ("teacherDisciplineId") REFERENCES "teachersDisciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disciplines" ADD CONSTRAINT "disciplines_termId_fkey" FOREIGN KEY ("termId") REFERENCES "terms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teachersDisciplines" ADD CONSTRAINT "teachersDisciplines_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "disciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teachersDisciplines" ADD CONSTRAINT "teachersDisciplines_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
