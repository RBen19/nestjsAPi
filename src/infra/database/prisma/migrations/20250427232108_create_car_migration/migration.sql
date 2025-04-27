-- CreateTable
CREATE TABLE "Car" (
    "idCar" SERIAL NOT NULL,
    "Immatriculation" VARCHAR(70) NOT NULL,
    "UserId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("idCar")
);

-- CreateIndex
CREATE UNIQUE INDEX "Car_Immatriculation_key" ON "Car"("Immatriculation");

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;
