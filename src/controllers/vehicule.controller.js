const vehiculeService = require('../services/vehicule.service');

exports.createVehicule = async (req, res, next) => {
  try {
    const vehicule = await vehiculeService.createVehicule(req.body);
    res.status(201).json({
      message: 'Véhicule créé avec succès',
      vehicule
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllVehicules = async (req, res, next) => {
  try {
    const vehicules = await vehiculeService.getAllVehicules();
    res.status(200).json(vehicules);
  } catch (error) {
    next(error);
  }
};

exports.deleteVehicule = async (req, res, next) => {
  try {
    await vehiculeService.deleteVehicule(req.params.id);
    res.status(200).json({ message: 'Véhicule supprimé avec succès' });
  } catch (error) {
    next(error);
  }
};
