const express = require("express");
const router = express.Router();

const {
  upsertHRProfile,
  getMyHRProfile
} = require("../controllers/HrController");

const {
  protect,
  authorize
} = require("../middlewares/authMiddleware");

router.post(
  "/profile",
  protect,
  authorize("HR"),
  upsertHRProfile
);

router.get(
  "/profile",
  protect,
  authorize("HR"),
  getMyHRProfile
);

module.exports = router;
