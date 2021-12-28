const express = require("express");
const router = express.Router();
const TaskModel = require("./tasks.model");
const ProjectModel = require("./projects.model");

router.post("/createTask", async (req, res) => {
  try {
    const task = new TaskModel({
      ...req.body,
    });
    const result = await task.save();
    res.status(201).json(result._doc);
  } catch (err) {
    console.log(err);
  }
});

router.post("/fetchTasks", async (req, res) => {
  try {
    const tasks = await TaskModel.find({ projectId: req.body.projectId });
    res.status(201).json(tasks);
  } catch (err) {
    console.log(err);
  }
});

router.post("/removeTask", async (req, res) => {
  try {
    await ProjectModel.updateOne(
      { _id: req.body.projectId },
      {
        $pull: {
          tasks: req.body.taskId,
        },
      }
    );
    await TaskModel.updateMany(
      {},
      {
        $pull: {
          dependsOn: req.body.taskId,
        },
      }
    );
    await TaskModel.deleteOne({ _id: req.body.taskId });
    res.status(201).json({ _id: req.body.taskId });
  } catch (err) {
    console.log(err);
  }
});

router.post("/fetchTask", async (req, res) => {
  try {
    const task = await TaskModel.findOne({ _id: req.body.taskId });
    res.status(201).json(task);
  } catch (err) {
    console.log(err);
  }
});

router.post("/updateProgress", async (req, res) => {
  try {
    const user = req.body.user;
    const subtask = req.body.subtask;
    const taskId = req.body.taskId;
    await TaskModel.updateOne(
      { "subtasks._id": subtask._id },
      {
        $set: {
          "subtasks.$.inProgress": subtask.inProgress,
          "subtasks.$.worker": subtask.inProgress ? user.id : "0",
        },
      }
    );
    const updatedTask = await TaskModel.findOne({ _id: taskId });
    res.status(201).json(updatedTask._doc);
  } catch (err) {
    console.log(err);
  }
});

router.post("/updateDone", async (req, res) => {
  try {
    const user = req.body.user;
    const subtask = req.body.subtask;
    const taskId = req.body.taskId;
    await TaskModel.updateOne(
      { "subtasks._id": subtask._id },
      {
        $set: {
          "subtasks.$.done": subtask.done,
          "subtasks.$.finisher": subtask.done ? user.id : "0",
        },
      }
    );
    const updatedTask = await TaskModel.findOne({ _id: taskId });
    res.status(201).json(updatedTask._doc);
  } catch (err) {
    console.log(err);
  }
});

router.post("/toggleTaskDone", async (req, res) => {
  try {
    const taskId = req.body.taskId;
    const task = await TaskModel.findOne({ _id: taskId });
    console.log(!task.done);
    await TaskModel.updateOne({ _id: taskId }, { done: !task.done });
    const updatedTask = await TaskModel.findOne({ _id: taskId });
    res.status(201).json(updatedTask);
  } catch (err) {
    console.log(err);
  }
});

router.post("/updateTask", async (req, res) => {
  try {
    await TaskModel.updateOne(
      { _id: req.body._id },
      {
        name: req.body.name,
        description: req.body.description,
        weight: req.body.weight,
        deadline: req.body.deadline,
        startDate: req.body.startDate,
        teams: req.body.teams,
        dependsOn: req.body.dependsOn,
        done: req.body.done,
        subtasks: req.body.subtasks,
      }
    );
    const task = await TaskModel.findOne({ _id: req.body._id });
    res.status(201).json(task);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
