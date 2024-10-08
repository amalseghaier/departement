// Exemple de correction dans le fichier index.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors'); 
const departementRoutes = require('./route/departementRoute');
const sequelize = require('./modele/departementModel'); 
require('dotenv').config();

// Port d'écoute du serveur
const PORT = process.env.PORT || 3007;

// Middleware pour parser le corps des requêtes en JSON
app.use(bodyParser.json());
app.use(cors());

// Monter les routes du département sur l'application
app.use('', departementRoutes);

sequelize.sync()
  .then(() => {
    console.log('Departement model synced with database');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error syncing Departement model:', error);
  });

module.exports = app;
