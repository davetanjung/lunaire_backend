/*
  Warnings:

  - You are about to drop the `Diary` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sound` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Diary";

-- DropTable
DROP TABLE "Sound";

-- CreateTable
CREATE TABLE "diaries" (
    "id" SERIAL NOT NULL,
    "bed_time" TIMESTAMP(0) NOT NULL,
    "wake_time" TIMESTAMP(0) NOT NULL,
    "sleep_hours" DOUBLE PRECISION NOT NULL,
    "mood" TEXT NOT NULL,
    "entry_date" DATE NOT NULL,

    CONSTRAINT "diaries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sounds" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "file_path" VARCHAR(255) NOT NULL,

    CONSTRAINT "sounds_pkey" PRIMARY KEY ("id")
);
