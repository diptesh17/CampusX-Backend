const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const candidateRoutes = require("./routes/candidateRoutes");
const hrRoutes = require("./routes/hrRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const hrApplicationRoutes = require("./routes/hrApplicationRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const applicationStatusRoutes = require("./routes/applicationStatusRoutes");



app.use("/api/auth", authRoutes);
app.use("/api/candidate", candidateRoutes);
app.use("/api/hr", hrRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/hr", hrApplicationRoutes);
app.use("/api/hr", analyticsRoutes);
app.use("/api/hr", applicationStatusRoutes);


app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

module.exports = app;
