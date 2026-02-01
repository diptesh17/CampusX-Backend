const express = require("express");
const router = express.Router();

const {
  upsertProfile,
  getMyProfile
} = require("../controllers/candidateController");

const {
  protect,
  authorize
} = require("../middlewares/authMiddleware");

router.post(
  "/profile",
  protect,
  authorize("CANDIDATE"),
  upsertProfile
);

router.get(
  "/profile",
  protect,
  authorize("CANDIDATE"),
  getMyProfile
);

module.exports = router;
