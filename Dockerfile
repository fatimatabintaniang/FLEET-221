# Image de base Node.js 18 (légère)
FROM node:18-alpine

# Dépendances système nécessaires pour bcrypt et Prisma
RUN apk add --no-cache openssl

# Dossier de travail dans le container
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Copier le schéma Prisma (nécessaire avant npm install)
COPY prisma ./prisma/

# Installer les dépendances
RUN npm install

# Générer le client Prisma
RUN npx prisma generate

# Copier tout le reste du projet
COPY . .

# Port exposé
EXPOSE 3000

# Démarrer l'application
CMD ["npm", "start"]