const prisma = require('../config/db.config');
const BaseRepository = require('./base.repository');

class AuthRepository extends BaseRepository {
  constructor() {
    super(prisma.user);
  }

  async findUserByEmail(email) {
    return this.model.findUnique({ where: { email } });
  }
}

module.exports = new AuthRepository();
