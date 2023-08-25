const router = require("express").Router();
const apiRoute = require("./apiRoute");

router.use("/notes", apiRoute);

module.exports = router;
