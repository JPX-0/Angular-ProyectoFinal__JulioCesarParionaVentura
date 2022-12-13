const { Schema } = require("mongoose");

const UserSchema = new Schema({
  info: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    image: { type: String },
    age: { type: Number, required: true },
    birth: { type: Date, required: true }
  },
  data: {
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Invalid email"],
    },
    password: { type: String, required: true },
    role: { type: String, required: true, default: "user" } // user, student, admin
  }
});

module.exports = UserSchema;