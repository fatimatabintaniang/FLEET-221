const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const errorHandler = require('./middlewares/error.middleware');

// Import du middleware d'authentification
const { protect } = require('./middlewares/auth.middleware');

// Import des routes
const authRoutes = require('./routes/auth.routes');
const vehiculeRoutes = require('./routes/vehicule.routes');
const chauffeurRoutes = require('./routes/chauffeur.routes');
const missionRoutes = require('./routes/mission.routes');
const maintenanceRoutes = require('./routes/maintenance.routes');

const app = express();

// Middlewares globaux
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes pour l'authentification (inscription et connexion)
app.use('/api/auth', authRoutes);

// Routes protégées
app.use('/api/vehicules', protect, vehiculeRoutes);
app.use('/api/chauffeurs', protect, chauffeurRoutes);
app.use('/api/missions', protect, missionRoutes);
app.use('/api/maintenances', protect, maintenanceRoutes);

// Route de test
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur l\'API FLEET 221 - Refactored' });
});

// Middleware de gestion des erreurs
app.use(errorHandler);
// Démarrage du serveur
const PORT = process.env.PORT || 3000;
// Permet de ne pas démarrer le serveur lors des tests unitaires
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
    console.log(`Swagger docs available at "${process.env.BASE_URL}:${PORT}/api-docs"`);
  });
}

module.exports = app;
