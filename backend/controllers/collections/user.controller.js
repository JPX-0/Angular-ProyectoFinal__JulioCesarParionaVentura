const STATUS = require("../../utils/constants/status.constants");
const DAO = require("../../models/daos/index.dao");
const { apiResponse } = require("../../utils/response.utils");
const CustomError = require("../../utils/error.utils");

const getById = async (id) => {
  const { NOT_FOUND } = STATUS;
  let response;
  try { response = await DAO.user.getOne({ _id: id }); } 
  catch(error) { throw new CustomError(NOT_FOUND, `The id: "${id}" entered does not match any user in our database.`); }
  if(!response) throw new CustomError(NOT_FOUND, "This user has been removed from the database.");
  return response;
}
const userLogin = async (email, password) => {
  const { NOT_FOUND } = STATUS;
  let response;
  try { response = await DAO.user.getOne({ "data.email": email }); } 
  catch(error) { throw new CustomError(NOT_FOUND, "The email or password does not match our database."); }
  if(!response) throw new CustomError(NOT_FOUND, "The email or password does not match our database.");
  if(response.data.password != password) 
    throw new CustomError(NOT_FOUND, "The email or password does not match our database.");
  return response;
}
const getYears = (date) => {
  let md = {
    day: +(new Date(date).getDate()),
    month: +(new Date(date).getMonth()),
    year: +(new Date(date).getFullYear())
  };
  let cd = {
    day: +(new Date(Date.now()).getDate()),
    month: +(new Date(Date.now()).getMonth()),
    year: +(new Date(Date.now()).getFullYear())
  };
  if(md.day > cd.day) md.month++;
  if(md.month > cd.month) md.year++;
  return { _myTime: md.year, _currentTime: cd.year }
}

const checkError = (body) => {
  const { BAD_REQUEST } = STATUS;
  const checkError_undefined = [
    { key: "info", value: body.info }, 
    { key: "data", value: body.data }, 
    { key: "info.firstName", value: body.info.firstName }, 
    { key: "info.lastName", value: body.info.lastName }, 
    { key: "info.image", value: body.info.image },
    { key: "data.email", value: body.data.email },
    { key: "data.password", value: body.data.password },
    { key: "data.role", value: body.data.role }
  ];
  checkError_undefined.forEach(e => {
    if(e.value == undefined) throw new CustomError(BAD_REQUEST, `[${e.key}] has not been assigned.`);
  });
  const checkError_date = [
    { key: "info.birth", value: body.info.birth },
  ];
  checkError_date.forEach(e => {
    if(`${e.value}` == `${new Date("Invalid Date")}`) throw new CustomError(BAD_REQUEST, `[${e.key}] is Invalid Date`);
  });
  const checkError_number = [
    { key: "info.age", value: body.info.age }
  ];
  checkError_number.forEach(e => {
    if(e.key == "info.age" && +e.value < 18) 
      throw new CustomError(BAD_REQUEST, `[${e.key}] must be greater than 18.`);
    else if(isNaN(+e.value)) throw new CustomError(BAD_REQUEST, `[${e.key}] must be an integer.`);
  });
  if(!(body.data.role == "user" || body.data.role == "student" || body.data.role == "admin")) 
    throw new CustomError(BAD_REQUEST, `[data.role] can only have the values: "user", "student" or "admin"`);
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if(!emailRegex.test(body.data.email)) throw new CustomError(BAD_REQUEST, `You must enter a valid email`); 
}
const checkSpecialError = {
  $queryFormat: ({ email, password }) => {
    if(email != undefined && email != "" && password != undefined && password != "") return true;
    return false;
  }
}

class UserController {
  async getData(req, res, next) {
    const { code: status } = STATUS.OK;
    const { params: { id }, query: { email, password } } = req;
    try { 
      if(id != undefined) {
        let response;
        if(id == "login" && checkSpecialError.$queryFormat(req.query)) response = userLogin(email, password);
        else response = getById(id)
        return res.status(status).json(apiResponse(await response, status)); 
      }
      if(id != undefined) return res.status(status).json(apiResponse(await getById(id), status));
      res.status(status).json(apiResponse(await DAO.user.getAll(), status)); 
    } catch(error) { next(error); }
  }
  async postData(req, res, next) {
    const { code: status } = STATUS.CREATED;
    const { _currentTime, _myTime } = getYears(req.body.birth);
    const dtoUser = {
      info: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        image: req.body.image != "" || "https://thumbs.dreamstime.com/b/un-gatito-marr%C3%B3n-122671266.jpg",
        age: _currentTime - _myTime,
        birth: new Date(req.body.birth)
      },
      data: {
        email: req.body.email,
        password: req.body.npassword,
        role: req.body.email.split(".")[0] == "admin" ? "admin" : req.body.role || "user"
      }
    }
    try {
      checkError(dtoUser);
      const response = await DAO.user.save(dtoUser);
      res.status(status).json(apiResponse(response, status));
    } catch (error) { next(error); }
  }
  async putData(req, res, next) {
    const { code: status } = STATUS.ACEPTED;
    const { params: { id }, body } = req;
    const { _currentTime, _myTime } = getYears(body.birth);
    try { 
      let foundData = await getById(id);
      foundData.info = { ...body, age: _currentTime - _myTime };
      checkError(foundData);
      await DAO.user.updateOne({ _id: id }, foundData);
      res.status(status).json(apiResponse("Updated success", status)); 
    } catch(error) { next(error); }
  }
  async deleteData(req, res, next) {
    const { code: status } = STATUS.NOT_FOUND;
    res.status(status).json("No implemented", status);
  }
}

const userController = new UserController()

module.exports = { userController, getById };