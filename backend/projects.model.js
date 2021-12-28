const Mongoose = require("mongoose");

const ProjectsModel = new Mongoose.Schema({
  owner: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    require: true,
  },
  image: String,
  contributors: {
    type: [String],
    default: [],
  },
  teams: {
    type: [
      {
        name: String,
        members: {
          type: [String],
          default: [],
        },
      },
    ],
    default: [],
  },
});

module.exports = Mongoose.model("project", ProjectsModel);
