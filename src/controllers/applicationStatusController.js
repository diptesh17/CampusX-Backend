const Application = require("../models/Application");
const Job = require("../models/Job");

const VALID_STATUSES = ["SCREENED", "SELECTED", "REJECTED"];

exports.updateApplicationStatus = async (req, res) => {
  try {
    if (!req.body || !req.body.status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const status = req.body.status.toUpperCase().trim();

    const VALID_STATUSES = ["SCREENED", "SELECTED", "REJECTED"];

    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const application = await Application.findById(req.params.applicationId)
      .populate("job");

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    if (application.job.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    application.status = status;
    await application.save();

    res.status(200).json({
      message: "Application status updated successfully",
      status: application.status
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update status" });
  }
};



