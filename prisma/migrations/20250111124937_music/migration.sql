/*
  Warnings:

  - You are about to alter the column `file_path` on the `Music` table. The data in that column could be lost. The data in that column will be cast from `VarChar` to `VarChar(1000)`.

*/
-- AlterTable
ALTER TABLE "Music" ALTER COLUMN "file_path" SET DATA TYPE VARCHAR(1000);
