const express = require("express");
const router = express.Router();

const {
  createJob,
  getMyJobs,
  toggleJobStatus
} = require("../controllers/jobController");

const {
  protect,
  authorize
} = require("../middlewares/authMiddleware");

router.post(
  "/",
  protect,
  authorize("HR"),
  createJob
);

router.get(
  "/my-jobs",
  protect,
  authorize("HR"),
  getMyJobs
);

router.patch(
  "/:id/toggle",
  protect,
  authorize("HR"),
  toggleJobStatus
);

module.exports = router;
