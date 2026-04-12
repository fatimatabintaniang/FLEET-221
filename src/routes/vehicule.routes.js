const express = require('express');
const router = express.Router();
const vehiculeController = require('../controllers/vehicule.controller');
const validate = require('../middlewares/validate.middleware');
const { createVehiculeSchema } = require('../validation/vehicule.validation');

router.post('/', validate(createVehiculeSchema), vehiculeController.createVehicule);
router.get('/', vehiculeController.getAllVehicules);
router.delete('/:id', vehiculeController.deleteVehicule);

module.exports = router;
