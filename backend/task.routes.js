const express = require("express");
const router = express.Router();
const TaskModel = require("./tasks.model");

router.post("/createTask", async (req, res) => {
    try{
        const task = new TaskModel({
            ...req.body
        })
        const result = await task.save();
        res.status(201).json(result._doc);
    }
    catch(err){
        console.log(err);
    }
})

router.post("/fetchTasks", async (req, res) => {
    try{
        const tasks = await TaskModel.find({projectId: req.body.projectId})
        res.status(201).json(tasks);
    }
    catch(err){
        console.log(err);
    }
});

module.exports = router;