const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  createTask,
  getTask,
  updatetask,
  deletetask,
} = require("../controller/tasksController");

router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(getTask).patch(updatetask).delete(deletetask);

module.exports = router;
