const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const candidateRoutes = require("./routes/candidateRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/candidate", candidateRoutes);


app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

module.exports = app;
