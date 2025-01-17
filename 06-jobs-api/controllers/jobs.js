const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};
const getJob = async (req, res) => {
  const job = await Job.findOne({
    createdBy: req.user.userId,
    _id: req.params.id,
  });
  res.status(StatusCodes.OK).json({ job });
};
const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};
const updateJob = async (req, res) => {
  const job = await Job.findOneAndUpdate(
    { createdBy: req.user.userId, _id: req.params.id },
    req.body,{new:true,runValidators:true}
  );
  res.status(StatusCodes.OK).json({ job });
};
const deleteJob = async (req, res) => {
  const job = await Job.findOneAndDelete({
    createdBy: req.user.userId,
    _id: req.params.id,
  });
  res.status(StatusCodes.OK).json({ job });
};

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
