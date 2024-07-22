/*
  Warnings:

  - You are about to drop the column `content` on the `Memo` table. All the data in the column will be lost.
  - You are about to drop the column `icon` on the `Memo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Memo" DROP COLUMN "content",
DROP COLUMN "icon",
ADD COLUMN     "contant" TEXT;
