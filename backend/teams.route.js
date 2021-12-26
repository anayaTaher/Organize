const express = require("express");
const router = express.Router();
const UserModel = require("./Models/users.model");
const ProjectModel = require("./Models/projects.model");

router.post("/addTeam", async (req, res) => {
  try {
    const projectId = req.body.projectId;
    const teamName = req.body.teamName;
    const members = req.body.members;
    const team = { name: teamName, members };
    const project = await ProjectModel.updateOne(
      { _id: projectId },
      {
        $push: { teams: team },
      }
    );
    res.status(200).json(project);
  } catch (err) {
    console.log(err);
  }
});

router.post("/fetchTeams", async (req, res) => {
    try{
        const projectId = req.body.projectId;
        const doc = await ProjectModel.findOne({_id: projectId});
        const {teams} = doc._doc;
        res.status(200).json(teams);
    }
    catch(err){
        console.log(err);
    }
})

module.exports = router;
