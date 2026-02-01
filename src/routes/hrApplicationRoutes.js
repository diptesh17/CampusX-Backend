const express = require("express");
const router = express.Router();

const {
  getApplicantsForJob,
  getApplicationDetails
} = require("../controllers/hrApplicationController");

const {
  protect,
  authorize
} = require("../middlewares/authMiddleware");

router.get(
  "/jobs/:jobId/applicants",
  protect,
  authorize("HR"),
  getApplicantsForJob
);

router.get(
  "/applications/:applicationId",
  protect,
  authorize("HR"),
  getApplicationDetails
);

module.exports = router;
