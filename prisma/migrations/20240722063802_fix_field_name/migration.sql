/*
  Warnings:

  - You are about to drop the column `contant` on the `Memo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Memo" DROP COLUMN "contant",
ADD COLUMN     "content" TEXT;
