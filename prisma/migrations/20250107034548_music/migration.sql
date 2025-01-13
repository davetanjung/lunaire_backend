-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "sound_name" VARCHAR(100) NOT NULL,
    "file_path" VARCHAR,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
