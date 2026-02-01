const Job = require("../models/Job");
const Application = require("../models/Application");
const CandidateProfile = require("../models/CandidateProfile");

// Get applicants for a job (HR only)
exports.getApplicantsForJob = async (req, res) => {
  try {
    const job = await Job.findOne({
      _id: req.params.jobId,
      createdBy: req.user.id
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const applications = await Application.find({ job: job._id })
      .populate("candidate", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: applications.length,
      applications
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch applicants" });
  }
};

// Get detailed candidate view from application
exports.getApplicationDetails = async (req, res) => {
  try {
    const application = await Application.findById(req.params.applicationId)
      .populate("candidate", "name email")
      .populate("job");

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Ensure HR owns the job
    if (application.job.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    const profile = await CandidateProfile.findOne({
      user: application.candidate._id
    });

    res.status(200).json({
      application,
      candidateProfile: profile
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch application details" });
  }
};
