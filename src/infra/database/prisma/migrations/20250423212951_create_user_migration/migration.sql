-- CreateTable
CREATE TABLE "User" (
    "idUser" SERIAL NOT NULL,
    "username" VARCHAR(70) NOT NULL,
    "password" VARCHAR(255),

    CONSTRAINT "User_pkey" PRIMARY KEY ("idUser")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
