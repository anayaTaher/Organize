const express = require("express");
const router = express.Router();
const TaskModel = require("./tasks.model");
const ProjectModel = require("./projects.model");
const AnnouncementModel = require("./announcements");

router.post("/createAnnouncement", async (req, res) => {
  try {
    const content = req.body.content;
    const projectId = req.body.projectId;
    const user = req.body.id;
    const toAddAnnouncement = new AnnouncementModel({
      projectId,
      content,
      owner: user,
      date: new Date(),
    });
    const announcement = await toAddAnnouncement.save();
    res.status(201).json(announcement);
  } catch (err) {
    console.log(err);
  }
});

router.post("/fetchAnnouncements", async (req, res) => {
  try {
    const projectId = req.body.projectId;
    const announcements = await AnnouncementModel.find({ projectId });
    res.status(201).json(announcements);
  } catch (err) {
    console.log(err);
  }
});

router.post("/likeAnnouncement", async (req, res) => {
  try {
    const announcementId = req.body.announcementId;
    const userId = req.body.userId;
    await AnnouncementModel.updateOne(
      { _id: announcementId },
      {
        $push: {
          likes: userId,
        },
      }
    );
    const updatedAnnouncement = await AnnouncementModel.findOne({_id: announcementId})
    res.status(201).json(updatedAnnouncement);
  } catch (err) {
    console.log(err);
  }
});

router.post("/unLikeAnnouncement", async (req, res) => {
  try {
    const announcementId = req.body.announcementId;
    const userId = req.body.userId;
    await AnnouncementModel.updateOne(
      { _id: announcementId },
      {
        $pull: {
          likes: userId,
        },
      }
    );
    const updatedAnnouncement = await AnnouncementModel.findOne({_id: announcementId})
    res.status(201).json(updatedAnnouncement);
  } catch (err) {
    console.log(err);
  }
});

router.post("/dislikeAnnouncement", async (req, res) => {
  try {
    const announcementId = req.body.announcementId;
    const userId = req.body.userId;
    await AnnouncementModel.updateOne(
      { _id: announcementId },
      {
        $push: {
          dislikes: userId,
        },
      }
    );
    const updatedAnnouncement = await AnnouncementModel.findOne({_id: announcementId})
    res.status(201).json(updatedAnnouncement);
  } catch (err) {
    console.log(err);
  }
});

router.post("/unDislikeAnnouncement", async (req, res) => {
  try {
    const announcementId = req.body.announcementId;
    const userId = req.body.userId;
    await AnnouncementModel.updateOne(
      { _id: announcementId },
      {
        $pull: {
          dislikes: userId,
        },
      }
    );
    const updatedAnnouncement = await AnnouncementModel.findOne({_id: announcementId})
    res.status(201).json(updatedAnnouncement);
  } catch (err) {
    console.log(err);
  }
});

router.post("/deleteAnnouncement", async (req, res) => {
    try {
      const announcementId = req.body.announcementId;
      await AnnouncementModel.deleteOne({_id: announcementId})
      res.status(201).json(announcementId);
    } catch (err) {
      console.log(err);
    }
  });

module.exports = router;
