const express = require("express");
const router = express.Router();
const UserModel = require("./users.model");
const ProjectModel = require("./projects.model");

router.post("/addContributor", async (req, res) => {
  try {
    const email = req.body.userEmail;
    const id = req.body.projectId;
    const doc = await UserModel.template.findOne({ email });
    const { password, ...user } = doc._doc;
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const project = await ProjectModel.findById(id);
    if (project._doc.owner == user._id) {
      res.status(200).json({});
      return;
    }
    await ProjectModel.updateOne(
      { _id: id },
      { $addToSet: { contributors: user._id } }
    );
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

router.post("/fetchContributors", async (req, res) => {
  try {
    const id = req.body.projectId;
    const { contributors } = await ProjectModel.findOne({ _id: id });
    let users = [];
    for (const id of contributors) {
      const res = await UserModel.template.findOne({ _id: id });
      users.push(res);
    }
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
  }
});

router.post("/deleteContributor", async (req, res) => {
  try {
    const projectId = req.body.projectId;
    const contributorId = req.body.contributorId;
    await ProjectModel.updateOne(
      { _id: projectId },
      { $pull: { contributors: contributorId } }
    );
    const doc = await UserModel.findById(contributorId);
    const { password, ...contributor } = doc._doc;
    res.json(contributor);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
