const Mongoose = require("mongoose");

const AnnouncementModel = new Mongoose.Schema({
  projectId: { type: String, required: true },
  owner: { type: String, required: true },
  content: {
    type: String,
    default: "",
  },
  date: { type: Date, default: new Date() },
  likes: {
    type: [String],
    default: [],
  },
  dislikes: {
    type: [String],
    default: [],
  },
});

module.exports = Mongoose.model("announcement", AnnouncementModel);
