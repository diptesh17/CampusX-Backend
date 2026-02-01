const express = require("express");
const router = express.Router();

const {
  updateApplicationStatus
} = require("../controllers/applicationStatusController");

const {
  protect,
  authorize
} = require("../middlewares/authMiddleware");

router.patch(
  "/applications/:applicationId/status",
  protect,
  authorize("HR"),
  updateApplicationStatus
);

module.exports = router;
