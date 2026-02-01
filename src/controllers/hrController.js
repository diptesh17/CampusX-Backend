const HRProfile = require("../models/HRProfile");

// CREATE or UPDATE HR profile
exports.upsertHRProfile = async (req, res) => {
  try {
    const { companyName, designation, contactNumber } = req.body;

    if (!companyName || !designation || !contactNumber) {
      return res.status(400).json({ message: "All fields required" });
    }

    const profile = await HRProfile.findOneAndUpdate(
      { user: req.user.id },
      {
        companyName,
        designation,
        contactNumber
      },
      { new: true, upsert: true }
    );

    res.status(200).json({
      message: "HR profile saved successfully",
      profile
    });
  } catch (error) {
    res.status(500).json({ message: "HR profile update failed" });
  }
};

// GET logged-in HR profile
exports.getMyHRProfile = async (req, res) => {
  try {
    const profile = await HRProfile.findOne({
      user: req.user.id
    }).populate("user", "name email");

    if (!profile) {
      return res.status(404).json({ message: "HR profile not found" });
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch HR profile" });
  }
};
