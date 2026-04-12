const vehiculeRepository = require('../repositories/vehicule.repository');
const missionRepository = require('../repositories/mission.repository');
const AppError = require('../utils/AppError');

class VehiculeService {
  async createVehicule(data) {
    const { immatriculation, marque, modele, kilometrage } = data;
    return vehiculeRepository.create({
      immatriculation,
      marque,
      modele,
      kilometrage: kilometrage || 0,
    });
  }

  async getAllVehicules() {
    return vehiculeRepository.findAll();
  }

  async deleteVehicule(id) {
    const vehicule = await vehiculeRepository.findByIdWithRelations(id);

    if (!vehicule) {
      throw new AppError('Véhicule non trouvé', 404);
    }

    const hasActiveMissions = vehicule.missions.some(
      m => m.statut === 'PLANIFIEE' || m.statut === 'EN_COURS'
    );

    if (hasActiveMissions) {
      throw new AppError('Impossible de supprimer ce véhicule car il a des missions planifiées ou en cours.', 400);
    }

    if (vehicule.maintenances.length > 0) {
      throw new AppError('Impossible de supprimer ce véhicule car il a des maintenances enregistrées.', 400);
    }

    await missionRepository.deleteByVehiculeId(id);
    return vehiculeRepository.delete(id);
  }
}

module.exports = new VehiculeService();
