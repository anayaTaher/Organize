const express = require("express");
const router = express.Router();
const UserModel = require("./users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ProjectModel = require("./projects.model");

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

router.post("/fetchProjectsIn", async (req, res) => {
  try {
    const userId = req.body.id;
    const projectList = await ProjectModel.find({ contributors: userId });
    res.status(200).json(projectList);
  } catch (err) {
    console.log(err);
  }
});

router.post("/isOwner", async (req, res) => {
  try {
    const userId = req.body.account.id;
    const project = await ProjectModel.findOne({ _id: req.body.projectId });
    if (project.owner === userId) res.status(200).json({ owner: true });
    else res.status(200).json({ owner: false });
  } catch (err) {
    console.log(err);
  }
});

router.post("/getProjectDetails", async (req, res) => {
  try {
    const projectId = req.body.projectId;
    const project = await ProjectModel.findOne({ _id: projectId });
    res.status(200).json(project);
  } catch (err) {
    console.log(err);
  }
});

router.post("/getProjectOwner", async (req, res) => {
  try{
    const projectId = req.body.projectId;
    const project = await ProjectModel.findOne({ _id: projectId });
    const user = await UserModel.template.findOne({_id: project.owner});
    const userToSend = {
      firstName: user.firstName,
      lastName: user.lastName,
      image: user.image
    }
    res.status(201).json(userToSend);
  }
  catch(err){
    console.log(err);
  }
})

module.exports = router;
