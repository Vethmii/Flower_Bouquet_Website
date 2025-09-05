const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/FeedbackController");

// Route to get all feedbacks
router.get("/", feedbackController.getAllFeedbacks);

// Route to add new feedback
router.post("/", feedbackController.addFeedback);

// Route to delete a feedback by ID
router.delete("/:id", feedbackController.deleteFeedback);

module.exports = router;


