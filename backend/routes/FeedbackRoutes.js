const express = require("express");
const router = express.Router();

// Example: a GET route
router.get("/", (req, res) => {
  res.json({ message: "Feedback endpoint working" });
});

module.exports = router;
