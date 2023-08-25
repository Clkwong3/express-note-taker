const express = require("express");
const htmlRoutes = require("./routes/html-route");
const apiRoutes = require("./routes/api-route");

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Middleware for API routes
app.use("/api", apiRoutes);

// Middleware for HTML routes
app.use("/", htmlRoutes);

// Start the server after setting up middleware and routes
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
