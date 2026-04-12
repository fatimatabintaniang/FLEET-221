const chauffeurService = require('../services/chauffeur.service');

exports.createChauffeur = async (req, res, next) => {
  try {
    const chauffeur = await chauffeurService.createChauffeur(req.body);
    res.status(201).json({
      message: 'Chauffeur créé avec succès',
      chauffeur
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllChauffeurs = async (req, res, next) => {
  try {
    const chauffeurs = await chauffeurService.getAllChauffeurs();
    res.status(200).json(chauffeurs);
  } catch (error) {
    next(error);
  }
};

exports.deleteChauffeur = async (req, res, next) => {
  try {
    await chauffeurService.deleteChauffeur(req.params.id);
    res.status(200).json({ message: 'Chauffeur supprimé avec succès' });
  } catch (error) {
    next(error);
  }
};
