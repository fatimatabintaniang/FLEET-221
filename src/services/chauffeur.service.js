const chauffeurRepository = require('../repositories/chauffeur.repository');
const missionRepository = require('../repositories/mission.repository');
const AppError = require('../utils/AppError');

class ChauffeurService {
  async createChauffeur(data) {
    const { prenom, nom, email, numPermis, telephone } = data;

    
    const existing = await chauffeurRepository.findByTelephone(telephone);
    if (existing) {
      throw new AppError(`Le numéro de téléphone "${telephone}" est déjà utilisé par un autre chauffeur.`, 409);
    }

    return chauffeurRepository.create({
      prenom,
      nom,
      email,
      numPermis,
      telephone
    });
  }

  async getAllChauffeurs() {
    return chauffeurRepository.findAll();
  }

  async deleteChauffeur(id) {
    const chauffeur = await chauffeurRepository.findByIdWithMissions(id);

    if (!chauffeur) {
      throw new AppError('Chauffeur non trouvé', 404);
    }

    const hasMissionPlanifiee = chauffeur.missions.some(m => m.statut === 'PLANIFIEE');

    if (hasMissionPlanifiee) {
      throw new AppError('Impossible de supprimer ce chauffeur car il a des missions planifiées.', 400);
    }

    await missionRepository.deleteByChauffeurId(id);
    return chauffeurRepository.delete(id);
  }
}

module.exports = new ChauffeurService();
