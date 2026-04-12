const maintenanceRepository = require('../repositories/maintenance.repository');
const vehiculeRepository = require('../repositories/vehicule.repository');
const AppError = require('../utils/AppError');

class MaintenanceService {
  async createMaintenance(data) {
    const { vehiculeId, type, date, cout, description } = data;

    const parsedDate = new Date(date);

    const vehicule = await vehiculeRepository.findByIdWithRelations(vehiculeId);

    if (!vehicule) {
      throw new AppError('Véhicule non trouvé.', 404);
    }

    return maintenanceRepository.create({
      vehiculeId,
      type,
      date: parsedDate,
      cout: cout || 0,
      description
    });
  }

  async getAllMaintenances() {
    return maintenanceRepository.findAllWithVehicule();
  }
}

module.exports = new MaintenanceService();
