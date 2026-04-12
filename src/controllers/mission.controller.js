const missionService = require('../services/mission.service');

exports.planifierMission = async (req, res, next) => {
  try {
    const mission = await missionService.planifierMission(req.body);
    res.status(201).json({
      message: 'Mission planifiée avec succès',
      mission
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllMissions = async (req, res, next) => {
  try {
    const missions = await missionService.getAllMissions();
    res.status(200).json(missions);
  } catch (error) {
    next(error);
  }
};
