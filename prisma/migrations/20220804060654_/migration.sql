-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(512),
    "login" VARCHAR(512),
    "password" VARCHAR(512),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT timezone('UTC+6'::text, CURRENT_TIMESTAMP),
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT timezone('UTC+6'::text, CURRENT_TIMESTAMP),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(512),
    "description" VARCHAR(2048),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT timezone('UTC+6'::text, CURRENT_TIMESTAMP),
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT timezone('UTC+6'::text, CURRENT_TIMESTAMP),

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);
