const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/config");
// Load input validation
const validateFeedbackInput = require("../../validation/feedback");
const validateFeedbackList = require("../../validation/feedbackList");

// Load Feedback model
const Feedback = require("../../models/feedback");

// @route POST api/feedback/submit
// @desc submit feedback
// @access Public
router.post("/submit", (req, res) => {
    // Form validation
    const { errors, isValid } = validateFeedbackInput(req.body);
    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const feedback = new Feedback({
      feedbackFor: req.body.feedbackFor,
      feedbackType: req.body.feedbackType,
      feedback: req.body.feedback,
      deliveredInPerson: req.body.deliveredInPerson,
      relatedLink: req.body.relatedLink,
      sentiment: req.body.sentiment,
      deliveredBy: req.body.deliveredBy
    });

    feedback
        .save()
        .then(feedback => res.json(feedback))
        .catch(err => console.log(err));
});

// route GET api/feedback/feedbackList
// @desc get list of feedback based on auth'd users choice
// @access Public
router.post("/feedbackList", (req,res) => {
  // const { errors, isValid } = validateFeedbackList(req.body.feedbackFor);

  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }

  const feedbackFor = req.body.feedbackFor._id;
  const from = new Date(req.body.from);
  const now = new Date(Date.now());
  console.log(from)
  console.log(now);

  // Find feedback for user
  Feedback.find({ feedbackFor: feedbackFor, timestamp: { $gte: from, $lte: now } }).then(feedback => {
    // Check if user exists
    if (!feedback) {
      return res.status(404).json({ feedbacknotfound: "feedback not found for user" });
    }
    console.log(feedback);
    res.send(feedback);
  });
});

module.exports = router;