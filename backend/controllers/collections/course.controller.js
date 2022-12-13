const STATUS = require("../../utils/constants/status.constants");
const DAO = require("../../models/daos/index.dao");
const { apiResponse } = require("../../utils/response.utils");
const CustomError = require("../../utils/error.utils");

const getById = async (id) => {
  const { NOT_FOUND } = STATUS;
  let response;
  try { response = await DAO.course.getOne({ _id: id }, "commissions"); } 
  catch(error) { throw new CustomError(NOT_FOUND, `The id: "${id}" entered does not match any course in our database.`); }
  if(!response) throw new CustomError(NOT_FOUND, "This course has been removed from the database.");
  return response;
}
const checkError = (body) => {
  const { BAD_REQUEST } = STATUS;
  const checkError_undefined = [
    { key: "date", value: body.date }, 
    { key: "time", value: body.time }, 
    { key: "name", value: body.name }, 
    { key: "teacher", value: body.teacher }, 
    { key: "days", value: body.days }, 
    { key: "date.start", value: body.date.start }, 
    { key: "date.end", value: body.date.end }, 
    { key: "time.start", value: body.time.start }, 
    { key: "time.end", value: body.time.end }, 
  ];
  checkError_undefined.forEach(e => {
    if(e.value == undefined) throw new CustomError(BAD_REQUEST, `[${e.key}] has not been assigned.`);
  });
  const checkError_date = [
    { key: "date.start", value: body.date.start }, 
    { key: "date.end", value: body.date.end }, 
  ];
  checkError_date.forEach(e => {
    if(`${e.value}` == `${new Date("Invalid Date")}`) throw new CustomError(BAD_REQUEST, `[${e.key}] is Invalid Date`);
  });
  if(!Array.isArray(body.groups)) throw new CustomError(BAD_REQUEST, `[groups] must be an array`);
}

class CourseController {
  async getData(req, res, next) {
    const { code: status } = STATUS.OK;
    const { id } = req.params;
    try { 
      if(id != undefined) return res.status(status).json(apiResponse(await getById(id), status));
      res.status(status).json(apiResponse(await DAO.course.getAll(), status)); 
    } catch(error) { next(error); }
  }
  async postData(req, res, next) {
    const { code: status } = STATUS.CREATED;
    const { body } = req;
    const dtoCourse = {
      name: `${body.name}`,
      commissions: []
    }
    const dtoCommission = {
      name: body.name,
      teacher: body.teacher,
      groups: [],
      date: { 
        start: new Date(body.date?.start),
        end: new Date(body.date?.end)
      },
      time: { 
        start: body.time?.start,
        end: body.time?.end
      },
      days: body.days,
    }
    try {
      checkError(dtoCommission);
      let response = await DAO.course.getOne({ name: body.name });
      if(!response) response = await DAO.course.save(dtoCourse);
      const { _id } = await DAO.commission.save(dtoCommission);
      response.commissions.push(_id);
      await DAO.course.updateOne({ name: body.name }, response);
      res.status(status).json(apiResponse(response, status));
    } catch (error) { next(error); }
  }
  async putData(req, res, next) {
    const { code: status } = STATUS.NOT_FOUND;
    res.status(status).json("No implemented", status);
  }
  async deleteData(req, res, next) {
    const { code: status } = STATUS.NOT_FOUND;
    res.status(status).json("No implemented", status);
  }
}

const courseController = new CourseController()

module.exports = courseController;