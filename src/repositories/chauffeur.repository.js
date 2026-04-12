const prisma = require('../config/db.config');
const BaseRepository = require('./base.repository');

class ChauffeurRepository extends BaseRepository {
  constructor() {
    super(prisma.chauffeur);
  }

  async findByTelephone(telephone) {
    return this.model.findUnique({ where: { telephone } });
  }

  async findByIdWithMissions(id) {
    return this.model.findUnique({
      where: { id: parseInt(id, 10) },
      include: { missions: true }
    });
  }
}

module.exports = new ChauffeurRepository();
