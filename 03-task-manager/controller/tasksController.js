const Task = require("../models/task");

const getAllTasks = async (req, res) => {
  try {
    const task = await Task.find({});
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });
    if (!task) {
      return res.status(404).json({ message: "no record find " });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const updatetask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidator: true,
    });
    if (!task) {
      return res.status(404).json({ message: "no record find " });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const deletetask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task) {
      return res.status(404).json({ message: "no record find " });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = { getAllTasks, createTask, getTask, updatetask, deletetask };
