const MongoCrud = require("../crud.dao");

class UserDao extends MongoCrud {
  static #instance;
  constructor(collection, schema) {
    if(!UserDao.#instance) {
      super(collection, schema);
      UserDao.#instance = this;
      return UserDao.#instance;
    } else return UserDao.#instance;
  }
}

module.exports = UserDao;