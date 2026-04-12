const missionRepository = require('../repositories/mission.repository');
const chauffeurRepository = require('../repositories/chauffeur.repository');
const vehiculeRepository = require('../repositories/vehicule.repository');
const AppError = require('../utils/AppError');

class MissionService {
  async planifierMission(data) {
    const { chauffeurId, vehiculeId, destination, dateDepart, dateRetour } = data;

    const parsedDateDepart = new Date(dateDepart);
    const parsedDateRetour = new Date(dateRetour);

    const chauffeur = await chauffeurRepository.findByIdWithMissions(chauffeurId);
    const vehicule = await vehiculeRepository.findByIdWithRelations(vehiculeId);

    if (!chauffeur) {
      throw new AppError('Chauffeur non trouvé.', 404);
    }
    if (!vehicule) {
      throw new AppError('Véhicule non trouvé.', 404);
    }

    if (vehicule.statut !== 'DISPONIBLE') {
      throw new AppError('Le véhicule n\'est pas disponible.', 400);
    }

    const chauffeurChevauchement = await missionRepository.findChevauchementChauffeur(
      chauffeurId,
      parsedDateDepart,
      parsedDateRetour
    );

    if (chauffeurChevauchement) {
      throw new AppError('Le chauffeur a déjà une mission planifiée ou en cours sur cette période.', 400);
    }

    const vehiculeChevauchement = await missionRepository.findChevauchementVehicule(
      vehiculeId,
      parsedDateDepart,
      parsedDateRetour
    );

    if (vehiculeChevauchement) {
      throw new AppError('Le véhicule a déjà une mission planifiée ou en cours sur cette période.', 400);
    }

    return missionRepository.create({
      chauffeurId,
      vehiculeId,
      destination,
      dateDepart: parsedDateDepart,
      dateRetour: parsedDateRetour,
      statut: 'PLANIFIEE'
    });
  }

  async getAllMissions() {
    return missionRepository.findAllWithRelations();
  }
}

module.exports = new MissionService();
