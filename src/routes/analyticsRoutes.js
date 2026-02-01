const express = require("express");
const router = express.Router();

const { getCandidateAnalytics } = require("../controllers/analyticsController");
const { protect, authorize } = require("../middlewares/authMiddleware");

router.get(
  "/applications/:applicationId/analytics",
  protect,
  authorize("HR"),
  getCandidateAnalytics
);

module.exports = router;
