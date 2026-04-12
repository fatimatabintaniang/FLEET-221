const prisma = require('../config/db.config');
const BaseRepository = require('./base.repository');

class MissionRepository extends BaseRepository {
  constructor() {
    super(prisma.mission);
  }

  async findAllWithRelations() {
    return this.model.findMany({
      include: {
        chauffeur: true,
        vehicule: true
      }
    });
  }

  async findChevauchementChauffeur(chauffeurId, dateDepart, dateRetour) {
    return this.model.findFirst({
      where: {
        chauffeurId,
        statut: { in: ['PLANIFIEE', 'EN_COURS'] },
        OR: [
          {
            dateDepart: { lt: dateRetour },
            dateRetour: { gt: dateDepart }
          }
        ]
      }
    });
  }

  async findChevauchementVehicule(vehiculeId, dateDepart, dateRetour) {
    return this.model.findFirst({
      where: {
        vehiculeId,
        statut: { in: ['PLANIFIEE', 'EN_COURS'] },
        OR: [
          {
            dateDepart: { lt: dateRetour },
            dateRetour: { gt: dateDepart }
          }
        ]
      }
    });
  }

  async deleteByVehiculeId(vehiculeId) {
    return this.model.deleteMany({
      where: { vehiculeId: parseInt(vehiculeId, 10) }
    });
  }

  async deleteByChauffeurId(chauffeurId) {
    return this.model.deleteMany({
      where: { chauffeurId: parseInt(chauffeurId, 10) }
    });
  }
}

module.exports = new MissionRepository();
