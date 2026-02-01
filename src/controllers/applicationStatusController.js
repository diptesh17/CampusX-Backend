const Application = require("../models/Application");
const sendEmail = require("../utils/sendEmail");
const {
  applicationStatusTemplate
} = require("../utils/emailTemplates");

const VALID_STATUSES = ["SCREENED", "SELECTED", "REJECTED"];

exports.updateApplicationStatus = async (req, res) => {
  try {
    // 1️⃣ Validate request body
    if (!req.body || !req.body.status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const status = req.body.status.toUpperCase().trim();

    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    // 2️⃣ Fetch application with required relations
    const application = await Application.findById(req.params.applicationId)
      .populate("job")
      .populate("candidate", "name email");

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // 3️⃣ HR ownership check
    if (application.job.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    // 4️⃣ Update status
    application.status = status;
    await application.save();

    // 5️⃣ Send email (NON-BLOCKING)
    try {
      await sendEmail({
        to: application.candidate.email,
        subject: "Application Status Update",
        html: applicationStatusTemplate({
          candidateName: application.candidate.name,
          jobTitle: application.job.title,
          status: application.status
        })
      });
    } catch (emailErr) {
      console.error("Email failed:", emailErr.message);
    }

    // 6️⃣ Final response
    return res.status(200).json({
      message: "Application status updated & email triggered",
      status: application.status
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to update status" });
  }
};
