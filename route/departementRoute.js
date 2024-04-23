const express = require('express');
const router = express.Router();
const DepartementController = require('../controllers/departementControlleur');

// Routes CRUD pour les départements
router.get('/', DepartementController.getAllDepartements);
router.get('/:id', DepartementController.getDepartementById);
router.post('/', DepartementController.createDepartement);
router.put('/:id', DepartementController.updateDepartement);
router.delete('/:id', DepartementController.deleteDepartement);

// Route de recherche par ID ou nom
router.get('/search', DepartementController.searchDepartement);

module.exports = router;
