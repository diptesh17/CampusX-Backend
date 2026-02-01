const mongoose = require("mongoose");

const candidateProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    cgpa: {
      type: Number,
      required: true,
      min: 0,
      max: 10
    },
    leetcode: {
      type: String,
      default: ""
    },
    geeksforgeeks: {
      type: String,
      default: ""
    },
    codeforces: {
      type: String,
      default: ""
    },
    codechef: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("CandidateProfile", candidateProfileSchema);
