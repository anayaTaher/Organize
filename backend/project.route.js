const express = require("express");
const router = express.Router();
const userCopy = require("./Models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ProjectModel = require("./Models/projects.model");

router.post("/createProject", async (req, res) => {
  try {
    const project = new ProjectModel({
      owner: req.body.owner,
      name: req.body.name,
      image: req.body.image,
    });
    const data = await project.save();
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
});

router.post("/fetchProjects", async (req, res) => {
  try {
    const ownerId = req.body.id;
    const projectList = await ProjectModel.find({ owner: ownerId });
    res.status(200).json(projectList);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
