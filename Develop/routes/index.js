// Import modules
const router = require("express").Router();
const apiRoute = require("./api-route");

// Attach API-related routes under /notes path
router.use("/notes", apiRoute);

// Export the router
module.exports = router;
