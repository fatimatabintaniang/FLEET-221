const prisma = require('../config/db.config');
const BaseRepository = require('./base.repository');

class VehiculeRepository extends BaseRepository {
  constructor() {
    super(prisma.vehicule);
  }

  async findByIdWithRelations(id) {
    return this.model.findUnique({
      where: { id: parseInt(id, 10) },
      include: {
        missions: true,
        maintenances: true,
      }
    });
  }
}

module.exports = new VehiculeRepository();
