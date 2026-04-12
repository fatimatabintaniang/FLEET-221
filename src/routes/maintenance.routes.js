const express = require('express');
const router = express.Router();
const maintenanceController = require('../controllers/maintenance.controller');
const validate = require('../middlewares/validate.middleware');
const { createMaintenanceSchema } = require('../validation/maintenance.validation');

router.post('/', validate(createMaintenanceSchema), maintenanceController.createMaintenance);
router.get('/', maintenanceController.getAllMaintenances);

module.exports = router;
