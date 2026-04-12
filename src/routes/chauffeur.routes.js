const express = require('express');
const router = express.Router();
const chauffeurController = require('../controllers/chauffeur.controller');
const validate = require('../middlewares/validate.middleware');
const { createChauffeurSchema } = require('../validation/chauffeur.validation');

router.post('/', validate(createChauffeurSchema), chauffeurController.createChauffeur);
router.get('/', chauffeurController.getAllChauffeurs);
router.delete('/:id', chauffeurController.deleteChauffeur);

module.exports = router;
