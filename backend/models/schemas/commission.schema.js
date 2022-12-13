const { Schema } = require("mongoose");

const ComissionSchema = new Schema({
  name: { type: String, required: true },
  teacher: { type: String, required: true, default: "Se asignará pronto" },
  groups: [{
    tutor: { type: String, required: true },
    students: [{ type: Schema.Types.ObjectId, ref: "user" }]
  }],
  date: { 
    start: { type: Date, required: true },
    end: { type: Date, required: true }
  },
  time: { 
    start: { type: String, required: true },
    end: { type: String, required: true }
  },
  days: { type: String, required: true },
  // comission: { type: Number, required: true }
});

module.exports = ComissionSchema;