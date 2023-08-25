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
router.post("/notes", (req, res) => {
  // Log the incoming request body for debugging purposes
  console.log(req.body);

  // Destructure properties from the request body
  const { title, text } = req.body;

  // Check if both title and text properties exist in the request body
  if (title && text) {
    try {
      // Read existing data from the db.json file
      const data = fs.readFileSync(dbFilePath, "utf8");
      const notes = JSON.parse(data);

      // Create a new note object with the provided title and text
      const newNote = {
        title,
        text,
        id: generateUniqueId(), // Create unique IDs for each note
      };

      // Add the new note to the array of existing notes
      notes.push(newNote);

      // Write the updated notes back to the db.json file
      fs.writeFileSync(dbFilePath, JSON.stringify(notes), "utf8");

      // Respond with the newly created note
      res.json(newNote);
    } catch (error) {
      // Handle errors during the note creation process
      console.error("Error creating a new note:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    // Respond with an error if title or text is missing from the request body
    res
      .status(400)
      .json({ error: "Invalid data provided for creating a note" });
  }
});

// Function to generate a unique ID
function generateUniqueId() {
  return uuidv4();
}

module.exports = router;
