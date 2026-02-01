const express = require("express");
const router = express.Router();

const {
  getActiveJobs,
  applyToJob
} = require("../controllers/applicationController");

const {
  protect,
  authorize
} = require("../middlewares/authMiddleware");

// Candidate job discovery
router.get(
  "/jobs",
  protect,
  authorize("CANDIDATE"),
  getActiveJobs
);

// Apply to job
router.post(
  "/apply/:jobId",
  protect,
  authorize("CANDIDATE"),
  applyToJob
);

module.exports = router;
