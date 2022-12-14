const MongoCrud = require("../crud.dao");

class CourseDao extends MongoCrud {
  static #instance;
  constructor(collection, schema) {
    if(!CourseDao.#instance) {
      super(collection, schema);
      CourseDao.#instance = this;
      return CourseDao.#instance;
    } else return CourseDao.#instance;
  }
  async getAll() {
    return await this.model.find({}, { __v: 0 }).populate("commissions");
  }
}

module.exports = CourseDao;