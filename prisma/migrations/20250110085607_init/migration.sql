/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Music" (
    "id" SERIAL NOT NULL,
    "sound_name" VARCHAR(100) NOT NULL,
    "file_path" VARCHAR,

    CONSTRAINT "Music_pkey" PRIMARY KEY ("id")
);
