const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const dbFilePath = path.join(__dirname, "../db/db.json");

// GET Route for getting notes
router.get("/notes", (req, res) => {
  try {
    // Reads the data from the file system and parse JSON
    const data = fs.readFileSync(dbFilePath, "utf8");
    const notes = JSON.parse(data);
    res.json(notes);
  } catch (error) {
    // Handle error while reading file
    console.error("Error reading notes from db:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST Route for creating a new note
router.post("/notes", (req, res) => {});

module.exports = router;
