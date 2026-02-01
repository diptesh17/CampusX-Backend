const Job = require("../models/Job");
const Application = require("../models/Application");

// GET all active jobs (for candidates)
exports.getActiveJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ isActive: true }).populate(
      "createdBy",
      "name"
    );

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};

// APPLY to a job
exports.applyToJob = async (req, res) => {
  try {
    const jobId = req.params.jobId;

    const job = await Job.findById(jobId);
    if (!job || !job.isActive) {
      return res.status(404).json({ message: "Job not available" });
    }

    const application = await Application.create({
      candidate: req.user.id,
      job: jobId
    });

    res.status(201).json({
      message: "Applied to job successfully",
      application
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Already applied to this job" });
    }
    res.status(500).json({ message: "Job application failed" });
  }
};
