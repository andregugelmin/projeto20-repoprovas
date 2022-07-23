/*
  Warnings:

  - You are about to drop the `teacher_disciplines` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "teacher_disciplines" DROP CONSTRAINT "teacher_disciplines_disciplineId_fkey";

-- DropForeignKey
ALTER TABLE "teacher_disciplines" DROP CONSTRAINT "teacher_disciplines_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "tests" DROP CONSTRAINT "tests_teacherDisciplineId_fkey";

-- DropTable
DROP TABLE "teacher_disciplines";
