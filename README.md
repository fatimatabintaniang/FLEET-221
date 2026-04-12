# Gestion d'un Parc Automobile — FLEET 221

Cette application est une API backend construite en **Node.js, Express, et Prisma (PostgreSQL)** permettant à l'entreprise FLEET 221 de gérer sa flotte de véhicules, ses chauffeurs, l'assignation des missions de transport et le suivi des maintenances.

L'API respecte une série de contraintes et de règles de gestion très strictes et a été bâtie selon les bonnes pratiques de la **Clean Architecture** (Orientée Objet : Controllers, Services, Repositories).

---

## 🛠 Prérequis

- **Node.js** (v18.0 ou supérieur)
- **PostgreSQL** installé et configuré
- **NPM** (Node Package Manager)

---

## 🚀 Installation

1. **Cloner ou ouvrir le projet**
   Assurez-vous d'être à la racine du projet dans votre terminal.

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement**
   Assurez-vous que le fichier `.env` existant contient l'URI de connexion à votre base de données PostgreSQL. Exemple : 
   ```env
   DATABASE_URL="postgresql://utilisateur:motdepasse@localhost:5432/fleet221?schema=public"
   JWT_SECRET="votre_cle_secrete_ultra_securisee"
   PORT=3000
   ```

4. **Synchroniser la base de données (Migrations/Prisma)**
   Appliquez le schéma de la base de données (`prisma/schema.prisma`) à votre instance PostgreSQL :
   ```bash
   npm run db:migrate
   ```
   *Ce processus générera automatiquement le client Prisma.*

5. **Démarrer l'application (Mode Dev)**
   ```bash
   npm run dev
   ```
   *Le serveur écoutera par défaut sur `http://localhost:3000`.*

---

## 🏗 Architecture du projet (N-Tiers / Orienté Objet)

Le projet observe une séparation stricte des responsabilités afin de maximiser sa maintenabilité :

- **`src/app.js`** : Point d'entrée de l'application, configure Express, les middlewares (CORS, Morgan, Auth) et enregistre Swagger.
- **`src/config/`** : 
  - `db.config.js` : Singleton d'instanciation du client Prisma.
  - `env.config.js` : Centralise les variables d'environnement.
- **`src/routes/`** : Mappe les verbes HTTP (GET, POST, DELETE) vers les contrôleurs respectifs, et injecte le middleware de validation Joi.
- **`src/controllers/`** : Extraire et renvoyer la donnée HTTP (requête et réponse json) au client web, en passant par le Service.
- **`src/services/`** : Contient **toute la logique métier** (vérification des dates, chevauchements de missions, hachage des mots de passe).
- **`src/repositories/`** : Couche d'interaction **exclusive à la Base de données**. Étendent `BaseRepository` afin de factoriser les appels de type CRUD (Create, FindAll, FindById, Delete).
- **`src/middlewares/`** : Protection des endpoints par JWT (`auth.middleware.js`), formatage formel et global des erreurs (`error.middleware.js`).

---

## 📚 Documentation API (Swagger)

L'entièreté de l'API est documentée avec **Swagger Open API 3.0**. 
Une fois votre serveur démarré, visitez `http://localhost:3000/api-docs` sur votre navigateur pour y accéder.

L'interface vous permet de :
1. Consulter les objets et structures des requêtes (Payloads).
2. Effectuer directement des tests d'effets sur les données en temps réel via l'interface.
3. Vous connecter dynamiquement à l'aide de l'intégration **Bearer Auth** pour agir sur les routes protégées.

### Routes Principales
| Entité | Méthodes | Modèles Gérés | Protection (JWT) |
|---|---|---|---|
| **`/api/auth`** | POST | Register / Login | ❌ (Public) |
| **`/api/vehicules`** | GET, POST, DELETE | Véhicules de la flotte | ✅ (Privé) |
| **`/api/chauffeurs`** | GET, POST, DELETE | Chauffeurs avec Permis | ✅ (Privé) |
| **`/api/missions`** | GET, POST | Assignation et Chevauchements | ✅ (Privé) |
| **`/api/maintenances`**| GET, POST | Fiches de suivi d'entretiens | ✅ (Privé) |

---

## 🛡️ Règles de Gestion Implémentées

Afin de respecter le cahier des charges, les contraintes suivantes sont validées (via `Joi` ou via `Prisma / Services`) :
- L’immatriculation, le numéro de permis et l'email sont strictement uniques.
- Le kilométrage et les coûts sont positifs (`>= 0`).
- Les noms/prénoms font minimum 2 caractères.
- Les dates sont vérifiées logiquement (Une mission part au minimum `aujourd'hui`, et retourne un jour >).
- **Suppression d'entités** : Impossible de supprimer un véhicule ou un chauffeur s'il possède une mission active ou planifiée. Impossible de supprimer un véhicule s'il présente un passif d'entretien.
- **Chevauchement temporel** : Il est strictement impossible d'assigner un chauffeur `OU` un véhicule sur de nouvelles missions dont les dates viennent couper des missions `PLANIFIEES` ou `EN_COURS`.
