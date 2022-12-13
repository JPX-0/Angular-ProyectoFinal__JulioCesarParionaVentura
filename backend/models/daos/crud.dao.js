const { model } = require("mongoose");

class MongoCrud {
  constructor(collection, schema) {
    this.model = model(collection, schema);
  }

  async getAll(populate) {
    if(populate) return await this.model.find({}, { __v: 0 }).populate(populate);
    return await this.model.find({}, { __v: 0 }).lean();
  }

  async getOne(filter, populate) {
    if(populate) return await this.model.findOne(filter, { __v: 0 }).populate(populate);
    return await this.model.findOne(filter, { __v: 0 }).lean();
  }

  async save(data) {
    return await this.model(data).save();
  }

  async updateOne(filter, data) {
    return await this.model.updateOne(filter, { $set: data });
  }

  async deleteAll() {
    return await this.model.deleteMany(); // {}
  }

  async deleteOne(filter) {
    return await this.model.deleteOne(filter);
  }
}

module.exports = MongoCrud;