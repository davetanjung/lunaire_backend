/*
  Warnings:

  - You are about to drop the column `categoryId` on the `activities` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `activities` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `diaries` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `sounds` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "activities" DROP CONSTRAINT "activities_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "activities" DROP CONSTRAINT "activities_userId_fkey";

-- DropForeignKey
ALTER TABLE "diaries" DROP CONSTRAINT "diaries_userId_fkey";

-- DropForeignKey
ALTER TABLE "sounds" DROP CONSTRAINT "sounds_userId_fkey";

-- AlterTable
ALTER TABLE "activities" DROP COLUMN "categoryId",
DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "diaries" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "sounds" DROP COLUMN "userId";
