-- CreateTable
CREATE TABLE "activities" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "start_time" TIMESTAMP(0) NOT NULL,
    "end_time" TIMESTAMP(0) NOT NULL,
    "date" DATE NOT NULL,

    CONSTRAINT "activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Diary" (
    "id" SERIAL NOT NULL,
    "bed_time" TIMESTAMP(0) NOT NULL,
    "wake_time" TIMESTAMP(0) NOT NULL,
    "sleep_hours" DOUBLE PRECISION NOT NULL,
    "mood" TEXT NOT NULL,
    "entry_date" DATE NOT NULL,

    CONSTRAINT "Diary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sound" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "file_path" VARCHAR(255) NOT NULL,

    CONSTRAINT "Sound_pkey" PRIMARY KEY ("id")
);
