const { Schema } = require("mongoose");

const CourseSchema = new Schema({
  name: { type: String, required: true },
  commissions: [{ type: Schema.Types.ObjectId, ref: "commission" }]
});

module.exports = CourseSchema;