const commissionController = require("./collections/commission.controller");
const courseController = require("./collections/course.controller");
const { userController } = require("./collections/user.controller");

const CONTROLLER = {
  user: userController,
  course: courseController,
  commission: commissionController
}
module.exports = CONTROLLER;