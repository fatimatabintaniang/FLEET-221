class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return this.model.create({ data });
  }

  async findAll() {
    return this.model.findMany();
  }

  async findById(id) {
    return this.model.findUnique({
      where: { id: parseInt(id, 10) }
    });
  }

  async delete(id) {
    return this.model.delete({
      where: { id: parseInt(id, 10) }
    });
  }
}

module.exports = BaseRepository;
