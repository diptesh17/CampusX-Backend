const Job = require("../models/Job");

// CREATE job (HR only)
exports.createJob = async (req, res) => {
  try {
    const { title, description, minCgpa } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description required" });
    }

    const job = await Job.create({
      title,
      description,
      minCgpa,
      createdBy: req.user.id
    });

    res.status(201).json({
      message: "Job created successfully",
      job
    });
  } catch (error) {
    res.status(500).json({ message: "Job creation failed" });
  }
};

// GET jobs created by logged-in HR
exports.getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ createdBy: req.user.id });

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};

// ACTIVATE / DEACTIVATE job
exports.toggleJobStatus = async (req, res) => {
  try {
    const job = await Job.findOne({
      _id: req.params.id,
      createdBy: req.user.id
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    job.isActive = !job.isActive;
    await job.save();

    res.status(200).json({
      message: "Job status updated",
      isActive: job.isActive
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update job status" });
  }
};
