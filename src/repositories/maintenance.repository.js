const prisma = require('../config/db.config');
const BaseRepository = require('./base.repository');

class MaintenanceRepository extends BaseRepository {
  constructor() {
    super(prisma.maintenance);
  }

  async findAllWithVehicule() {
    return this.model.findMany({
      include: {
        vehicule: true
      }
    });
  }
}

module.exports = new MaintenanceRepository();
