const Task = require("../models/task");
const asyncWrappper = require("../middleware/asyncWrapper");

const getAllTasks = asyncWrappper(async (req, res) => {
  const task = await Task.find({});
  res.status(200).json(task);
});

const createTask = asyncWrappper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json(task);
});

const getTask = asyncWrappper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    return res.status(404).json({ message: "no record find " });
  }
  res.status(200).json(task);
});

const updatetask = asyncWrappper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidator: true,
  });
  if (!task) {
    return res.status(404).json({ message: "no record find " });
  }
  res.status(200).json(task);
});

const deletetask = asyncWrappper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return res.status(404).json({ message: "no record find " });
  }
  res.status(200).json(task);
});

module.exports = { getAllTasks, createTask, getTask, updatetask, deletetask };
