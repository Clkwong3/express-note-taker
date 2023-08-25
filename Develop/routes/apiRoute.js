const router = require("express").Router();
const db = require("../db/db.json");

router.get("/", (req, res) => {
  res.json(db);
});

module.exports = router;
