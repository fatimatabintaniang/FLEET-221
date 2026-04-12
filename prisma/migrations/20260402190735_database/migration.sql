-- CreateEnum
CREATE TYPE "VehiculeStatut" AS ENUM ('DISPONIBLE', 'EN_MISSION', 'EN_MAINTENANCE');

-- CreateEnum
CREATE TYPE "MissionStatut" AS ENUM ('PLANIFIEE', 'EN_COURS', 'TERMINEE', 'ANNULEE');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicules" (
    "id" SERIAL NOT NULL,
    "immatriculation" TEXT NOT NULL,
    "marque" TEXT NOT NULL,
    "modele" TEXT NOT NULL,
    "kilometrage" INTEGER NOT NULL DEFAULT 0,
    "statut" "VehiculeStatut" NOT NULL DEFAULT 'DISPONIBLE',

    CONSTRAINT "vehicules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chauffeurs" (
    "id" SERIAL NOT NULL,
    "prenom" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "num_permis" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "chauffeurs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "missions" (
    "id" SERIAL NOT NULL,
    "chauffeur_id" INTEGER NOT NULL,
    "vehicule_id" INTEGER NOT NULL,
    "destination" TEXT NOT NULL,
    "date_depart" TIMESTAMPTZ NOT NULL,
    "date_retour" TIMESTAMPTZ NOT NULL,
    "statut" "MissionStatut" NOT NULL DEFAULT 'PLANIFIEE',

    CONSTRAINT "missions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maintenances" (
    "id" SERIAL NOT NULL,
    "vehicule_id" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "cout" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "description" TEXT,

    CONSTRAINT "maintenances_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "vehicules_immatriculation_key" ON "vehicules"("immatriculation");

-- CreateIndex
CREATE UNIQUE INDEX "chauffeurs_num_permis_key" ON "chauffeurs"("num_permis");

-- CreateIndex
CREATE UNIQUE INDEX "chauffeurs_email_key" ON "chauffeurs"("email");

-- CreateIndex
CREATE UNIQUE INDEX "missions_chauffeur_id_date_depart_date_retour_key" ON "missions"("chauffeur_id", "date_depart", "date_retour");

-- CreateIndex
CREATE UNIQUE INDEX "missions_vehicule_id_date_depart_date_retour_key" ON "missions"("vehicule_id", "date_depart", "date_retour");

-- AddForeignKey
ALTER TABLE "missions" ADD CONSTRAINT "missions_chauffeur_id_fkey" FOREIGN KEY ("chauffeur_id") REFERENCES "chauffeurs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "missions" ADD CONSTRAINT "missions_vehicule_id_fkey" FOREIGN KEY ("vehicule_id") REFERENCES "vehicules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenances" ADD CONSTRAINT "maintenances_vehicule_id_fkey" FOREIGN KEY ("vehicule_id") REFERENCES "vehicules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
