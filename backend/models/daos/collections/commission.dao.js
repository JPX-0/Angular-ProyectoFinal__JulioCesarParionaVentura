const MongoCrud = require("../crud.dao");

class ComissionDao extends MongoCrud {
  static #instance;
  constructor(collection, schema) {
    if(!ComissionDao.#instance) {
      super(collection, schema);
      ComissionDao.#instance = this;
      return ComissionDao.#instance;
    } else return ComissionDao.#instance;
  }
  async getOne(filter) {
    const ingnore = { __v: 0, "groups._id": 0 }
    return await this.model.findOne(filter, ingnore).populate("groups.students", { info: 1 });
  }
  async getAllUserCourses(id) {
    const ignore = { __v: 0, days: 0, time: 0, "groups._id": 0 };
    const course = await this.model.find({ "groups.students": { $in: [id] } }, ignore).sort({ date: 1 }).lean();
    const myCourse = course.map(commission => {
      const tutor = (commission.groups.find(group => group.students.find(e => e == id))).tutor;
      let action;
      let _checkingTime = {
        start: +(new Date(commission.date.start)),
        end: +(new Date(commission.date.end)),
        now: +(new Date())
      }
      if(_checkingTime.start > _checkingTime.now) action = "without-starting";
      if((_checkingTime.start <= _checkingTime.now) && (_checkingTime.end >= _checkingTime.now)) action = "studying";
      if(_checkingTime.end < _checkingTime.now) action = "finalized";
      return { _id: commission._id, name: commission.name, teacher: commission.teacher, tutor, action };
    });
    return myCourse;
  }
}

module.exports = ComissionDao;