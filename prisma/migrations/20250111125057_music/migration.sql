/*
  Warnings:

  - Made the column `file_path` on table `Music` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Music" ALTER COLUMN "file_path" SET NOT NULL;
