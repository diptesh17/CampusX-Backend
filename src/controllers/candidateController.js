const CandidateProfile = require("../models/CandidateProfile");

// CREATE or UPDATE profile
exports.upsertProfile = async (req, res) => {
  try {
    const { cgpa, leetcode, geeksforgeeks, codeforces, codechef } = req.body;

    if (!cgpa) {
      return res.status(400).json({ message: "CGPA is required" });
    }

    const profile = await CandidateProfile.findOneAndUpdate(
      { user: req.user.id },
      {
        cgpa,
        leetcode,
        geeksforgeeks,
        codeforces,
        codechef
      },
      { new: true, upsert: true }
    );

    res.status(200).json({
      message: "Profile saved successfully",
      profile
    });
  } catch (error) {
    res.status(500).json({ message: "Profile update failed" });
  }
};

// GET logged-in candidate profile
exports.getMyProfile = async (req, res) => {
  try {
    const profile = await CandidateProfile.findOne({
      user: req.user.id
    }).populate("user", "name email");

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};
