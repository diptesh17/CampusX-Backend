const mongoose = require("mongoose");

const hrProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    companyName: {
      type: String,
      required: true,
      trim: true
    },
    designation: {
      type: String,
      required: true,
      trim: true
    },
    contactNumber: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("HRProfile", hrProfileSchema);
