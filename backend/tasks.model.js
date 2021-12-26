const Mongoose = require("mongoose");

const TasksModel = new Mongoose.Schema({
  projectId: String,
  name: String,
  description: String,
  weight: Number,
  startDate: Date,
  deadline: Date,
  subtasks: {
    type: [
      {
        name: String,
        weight: Number,
        inProgress: Boolean,
        done: Boolean,
        worker: String,
      },
    ],
    default: [],
  },
  teams: { type: [String], default: [] },
  dependsOn: { type: [String], default: [] },
});

module.exports = Mongoose.model("task", TasksModel);
