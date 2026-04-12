const maintenanceService = require('../services/maintenance.service');

exports.createMaintenance = async (req, res, next) => {
  try {
    const maintenance = await maintenanceService.createMaintenance(req.body);
    res.status(201).json({
      message: 'Maintenance enregistrée avec succès',
      maintenance
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllMaintenances = async (req, res, next) => {
  try {
    const maintenances = await maintenanceService.getAllMaintenances();
    res.status(200).json(maintenances);
  } catch (error) {
    next(error);
  }
};
