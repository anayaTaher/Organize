const mongoose = require("mongoose");

const userTemplate = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

userTemplate.path("email").validate(async (email) => {
  const emailCount = await mongoose.models.user.countDocuments({ email });
  return !emailCount;
}, "Email already exists");

module.exports = mongoose.model("user", userTemplate);
