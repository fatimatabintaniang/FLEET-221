/*
  Warnings:

  - A unique constraint covering the columns `[telephone]` on the table `chauffeurs` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "chauffeurs_telephone_key" ON "chauffeurs"("telephone");
