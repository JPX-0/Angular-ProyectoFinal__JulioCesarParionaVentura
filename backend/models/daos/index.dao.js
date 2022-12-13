const mongoose = require("mongoose");
const dbConfig = require("../../utils/config/db.config");
const env = require("../../utils/config/env.config");

const UserDao = require("./collections/user.dao");
const CourseDao = require("./collections/course.dao");
const CommissionDao = require("./collections/commission.dao");

class Dao {
  static #dbInstances;

  static #daos = {
    user: (collection, schema) => new UserDao(collection, schema),
    course: (collection, schema) => new CourseDao(collection, schema),
    commission: (collection, schema) => new CommissionDao(collection, schema)
  };

  static #getDao = (collection) => {
    const schema = require(`../schemas/${collection}.schema`);
    return Dao.#daos[collection](collection, schema);
  };

  constructor() {
    console.log(`Connecting to "${env.DB_NAME}" database...`);
    if(!Dao.#dbInstances) {
      mongoose.connect(dbConfig.connect())
        .then(() => console.log(`Connected to the "${env.DB_NAME}" database!`))
        .catch(error => { throw new Error("An error occurred while connecting the database: ", error) })
      Dao.#dbInstances = this;
      return Dao.#dbInstances;
    } else return Dao.#dbInstances;
  }

  get user() {
    return Dao.#getDao("user");
  }
  get course() {
    return Dao.#getDao("course");
  }
  get commission() {
    return Dao.#getDao("commission");
  }
};

const DAO = new Dao();

module.exports = DAO;