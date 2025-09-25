const Feedback = require("../models/Feedback");

// Get all feedbacks
exports.getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add new feedback
exports.addFeedback = async (req, res) => {
  try {
    const { customerName, rating, comment, date, screenshotURL } = req.body;

    if (!customerName || !rating || !comment || !date) {
      return res.status(400).json({ message: "All required fields must be filled." });
    }

    const newFeedback = new Feedback({
      customerName,
      rating,
      comment,
      date,
      screenshotURL: screenshotURL || "",
    });

    const savedFeedback = await newFeedback.save();
    res.status(201).json(savedFeedback);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a feedback
exports.deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const feedback = await Feedback.findById(id);
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    await Feedback.findByIdAndDelete(id);
    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

