const Mongoose = require("mongoose");

const TasksModel = new Mongoose.Schema({
  projectId: String,
  name: String,
  description: String,
  weight: { type: Number, default: 0 },
  startDate: Date,
  deadline: Date,
  subtasks: {
    type: [
      {
        name: String,
        weight: { type: Number, default: 0 },
        inProgress: { type: Boolean, default: false },
        done: { type: Boolean, default: false },
        worker: { type: String, default: "0" },
        finisher: { type: String, default: "0" },
      },
    ],
    default: [],
  },
  teams: { type: [String], default: [] },
  dependsOn: { type: [String], default: [] },
  done: { type: Boolean, default: false },
});

module.exports = Mongoose.model("task", TasksModel);
