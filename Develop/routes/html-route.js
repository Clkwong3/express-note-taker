const express = require("express");
const router = express.Router();
const path = require("path");

// GET Route for homepage
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// GET Route for feedback page
router.get("/feedback", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

// Catch-all route for 404 page
router.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "../public/404.html"));
});

module.exports = router;
