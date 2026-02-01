const CandidateProfile = require("../models/CandidateProfile");
const Application = require("../models/Application");
const Job = require("../models/Job");

exports.getCandidateAnalytics = async (req, res) => {
  try {
    const application = await Application.findById(req.params.applicationId)
      .populate("candidate", "name email")
      .populate("job");

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // HR ownership check
    if (application.job.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    const profile = await CandidateProfile.findOne({
      user: application.candidate._id
    });

    if (!profile) {
      return res.status(404).json({ message: "Candidate profile not found" });
    }

    // ---- Derived Analytics ----
    const codingProfiles = {
      leetcode: !!profile.leetcode,
      geeksforgeeks: !!profile.geeksforgeeks,
      codeforces: !!profile.codeforces,
      codechef: !!profile.codechef
    };

    const codingProfileCount = Object.values(codingProfiles).filter(Boolean).length;

    let cgpaBand = "LOW";
    if (profile.cgpa >= 8.5) cgpaBand = "HIGH";
    else if (profile.cgpa >= 7) cgpaBand = "MEDIUM";

    res.status(200).json({
      candidate: {
        name: application.candidate.name,
        email: application.candidate.email
      },
      academic: {
        cgpa: profile.cgpa,
        cgpaBand
      },
      codingProfiles: {
        links: {
          leetcode: profile.leetcode,
          geeksforgeeks: profile.geeksforgeeks,
          codeforces: profile.codeforces,
          codechef: profile.codechef
        },
        presenceScore: `${codingProfileCount}/4`
      },
      application: {
        jobTitle: application.job.title,
        status: application.status,
        appliedOn: application.createdAt
      },
      insights: {
        profileCompleteness:
          profile.cgpa && codingProfileCount > 0 ? "GOOD" : "BASIC",
        screeningHint:
          profile.cgpa >= application.job.minCgpa
            ? "MEETS_CGPA_CRITERIA"
            : "BELOW_CGPA_CRITERIA"
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to generate analytics" });
  }
};
