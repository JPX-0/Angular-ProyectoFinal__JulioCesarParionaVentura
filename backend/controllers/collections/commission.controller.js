const { NOT_FOUND, ACEPTED, OK, BAD_REQUEST, NOT_AUTHORIZED } = require("../../utils/constants/status.constants");
const DAO = require("../../models/daos/index.dao");
const { apiResponse } = require("../../utils/response.utils");
const CustomError = require("../../utils/error.utils");
const { getById: getByIdUser } = require("./user.controller");

const getById = async (id) => {
  let response;
  try { response = await DAO.commission.getOne({ _id: id }); } 
  catch(error) { throw new CustomError(NOT_FOUND, `The id: "${id}" entered does not match any commission in our database.`); }
  if(!response) throw new CustomError(NOT_FOUND, "This commission has been removed from the database.");
  return response;
}
const getMyCourses = async (idUser) => {
  let response;
  try { response = await DAO.commission.getAllUserCourses(idUser); } 
  catch(error) { throw new CustomError(NOT_FOUND, `The id: "${idUser}" entered does not match any commission in our database.`); }
  if(!response) throw new CustomError(NOT_FOUND, "This commission has been removed from the database.");
  return response;
}
const changeUserRol = async (_id, role) => {
  const user = await getByIdUser(_id);
  if(user.data.role == "student" && role == "user") {
    const myCourses = await getMyCourses(_id);
    if(myCourses.length == 1) {
      user.data.role = role;
      await DAO.user.updateOne({ _id }, user);
    }
  } else if(user.data.role == "user" && role == "student") {
    user.data.role = role;
    await DAO.user.updateOne({ _id }, user);
  } else if(user.data.role == "admin") 
    throw new CustomError(NOT_AUTHORIZED, `the user "${_id}" entered cannot be a student`); 
  return user ? true : false;
}

const checkError = (body) => {
  const checkError_undefined = [
    { key: "name", value: body.name }, 
    { key: "teacher", value: body.teacher }, 
    { key: "date", value: body.date }, 
    { key: "date.start", value: body.date.start }, 
    { key: "date.end", value: body.date.end }, 
    { key: "time", value: body.time }, 
    { key: "time.start", value: body.time.start }, 
    { key: "time.end", value: body.time.end }, 
    { key: "time.end", value: body.time.end }, 
    { key: "days", value: body.days }, 
  ];
  checkError_undefined.forEach(e => {
    if(e.value == undefined) throw new CustomError(BAD_REQUEST, `[${e.key}] has not been assigned.`);
  });
  if(!Array.isArray(body.groups)) throw new CustomError(BAD_REQUEST, `[groups] must be an array`)
}
const checkSpecialError = {
  $bodyFormat: ({ teacher, date, time, days, _addGroup, _addStudent, _removeStudent }) => {
    if((teacher || date || time || days) && (_addGroup || _addStudent || _removeStudent)) 
      throw new CustomError(BAD_REQUEST, "You cannot update both the commission data and the commission group.");
  },
  $addGroup: (data, { tutor, students }) => {
    if(tutor == undefined) 
      throw new CustomError(BAD_REQUEST, `["groups: [{tutor}]"] has not been assigned.`);
    data.forEach(group => {
      if(group.tutor == tutor) throw new CustomError(BAD_REQUEST, "This tutor was already assigned to another group");
    })
    if(!Array.isArray(students)) throw new CustomError(BAD_REQUEST, `["groups: [{students}]"] must be an array.`);
  },
  $addStudent: (data, { tutor, student }) => {
    if(tutor == undefined) 
      throw new CustomError(BAD_REQUEST, `["groups: [{tutor}]"] has not been assigned.`);
    if(student == undefined) 
      throw new CustomError(BAD_REQUEST, `["groups: [{student}]"] has not been assigned.`);
    const groupExist = data.findIndex(e => tutor == e.tutor);
    let msg = `The Tutor: "${tutor}" entered does not match any commission in our database.`;
    if(groupExist < 0) throw new CustomError(BAD_REQUEST, msg);
    data.forEach(group => {
      const studentFound = group.students.find(e => e._id == student);
      msg = `This student is already registered in the group of the tutor "${group.tutor}"`
      if(studentFound) throw new CustomError(BAD_REQUEST, msg);
    })
    return { indexGroup: groupExist };
  },
  $removeStudent: (data, { tutor, student }) => {
    if(tutor == undefined) 
      throw new CustomError(BAD_REQUEST, `["groups: [{tutor}]"] has not been assigned.`);
    if(student == undefined) 
      throw new CustomError(BAD_REQUEST, `["groups: [{student}]"] has not been assigned.`);
    const groupExist = data.findIndex(e => tutor == e.tutor);
    let msg = `The Tutor: "${tutor}" entered does not match any commission in our database.`;
    if(groupExist < 0) throw new CustomError(BAD_REQUEST, msg);
    const studentExist = data[groupExist].students.findIndex(e => e._id == student);
    msg = `The Student: "${student}" entered does not belong to the group.`;
    if(studentExist < 0) throw new CustomError(BAD_REQUEST, msg);
    return { indexGroup: groupExist, indexStudent: studentExist };
  }
}

class CommissionController {
  async getData(req, res, next) {
    const { code: status } = OK;
    const { params: { id }, query: { idUser } } = req;
    try { 
      if(id != undefined) {
        let response;
        if(id == "myCourses" && idUser != undefined && idUser != "") response = getMyCourses(idUser); 
        else response = getById(id)
        return res.status(status).json(apiResponse(await response, status)); 
      }
      res.status(status).json(apiResponse(await DAO.commission.getAll(), status)); 
    } catch(error) { next(error); }
  }
  async postData(req, res, next) {
    const { code: status } = NOT_FOUND;
    res.status(status).json("No implemented", status);
  }
  async putData(req, res, next) {
    const { code: status } = ACEPTED;
    const { params: { id }, body: { teacher, date, time, days, _addGroup, _addStudent, _removeStudent } } = req;
    let foundData;
    try {
      checkSpecialError.$bodyFormat(req.body);
      foundData = await getById(id);
    } catch(error) { next(error); }
    try {
      if(teacher || date || time || days) {
        if(teacher) foundData.teacher = teacher;
        if(date?.start) foundData.date.start = new Date(date.start);
        if(date?.end) foundData.date.end = new Date(date.end);
        if(time?.start) foundData.time.start = time.start;
        if(time?.end) foundData.time.end = time.end;
        if(days) foundData.days = days;
        checkError(foundData);
        await DAO.commission.updateOne({ _id: id }, foundData);
        return res.status(status).json(apiResponse("Updated success", status)); 
      }
    } catch(error) { next(error); }
    try {
      if(_addGroup) {
        const newGroup = { tutor: _addGroup, students: [] }
        checkSpecialError.$addGroup(foundData.groups, newGroup);
        foundData.groups.push(newGroup);
        await DAO.commission.updateOne({ _id: id }, foundData);
      } else if(_addStudent) {
        const { indexGroup } = checkSpecialError.$addStudent(foundData.groups, _addStudent);
        const key = await changeUserRol(_addStudent.student, "student");
        if(key) {
          foundData.groups[indexGroup].students.push(_addStudent.student);
          await DAO.commission.updateOne({ _id: id }, foundData);
        }
      } else if(_removeStudent) {
        const { indexGroup, indexStudent } = checkSpecialError.$removeStudent(foundData.groups, _removeStudent);
        const key = await changeUserRol(_removeStudent.student, "user");
        if(key) {
          foundData.groups[indexGroup].students.splice(indexStudent, 1);
          await DAO.commission.updateOne({ _id: id }, foundData);
        }
      } else await DAO.commission.updateOne({ _id: id }, foundData);
      res.status(status).json(apiResponse("Updated success", status)); 
    } catch(error) { next(error); }
  }
  async deleteData(req, res, next) {
    const { code: status } = NOT_FOUND;
    res.status(status).json("No implemented", status);
  }
}

const commissionController = new CommissionController()

module.exports = commissionController;