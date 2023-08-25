const router = require("express").Router();
const apiRoute = require("./api-route");

router.use("/notes", apiRoute);

module.exports = router;
