const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/config");

// Load input validation
const validateFeedbackInput = require("../../validation/feedback");

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

// route GET api/feedback/feedbackListFor
// @desc get list of feedback based on auth'd users choice
// @access Public
router.post("/feedbackListFor", (req,res) => {
  const feedbackFor = req.body.feedbackFor;
  const from = new Date(req.body.from);
  const now = new Date(Date.now());

  // Find feedback for user
  Feedback.find({ feedbackFor: feedbackFor, timestamp: { $gt: from } }).then(feedback => {
    // Check if user exists
    if (!feedback) {
      return res.status(404).json({ feedbacknotfound: "feedback not found for user" });
    }
    res.send(feedback);
  });
});

// route GET api/feedback/feedbackListBy
// @desc get list of feedback based on auth'd users choice
// @access Public
router.post("/feedbackListBy", (req,res) => {
  const deliveredBy = req.body.feedbackFor;
  const from = new Date(req.body.from);
  const now = new Date(Date.now());

  // Find feedback for user
  Feedback.find({ deliveredBy: feedbackFor, timestamp: { $gt: from } }).then(feedback => {
    // Check if user exists
    if (!feedback) {
      return res.status(404).json({ feedbacknotfound: "feedback not found for user" });
    }
    res.send(feedback);
  });
});

// route GET api/feedback/feedbackListByManager
// @desc get list of feedback based on auth'd users choice
// @access Public
router.post("/feedbackListByManager", (req,res) => {
  const manager = req.body.feedbackFor;
  const from = new Date(req.body.from);
  const now = new Date(Date.now());

  // Find feedback for user
  Feedback.find({ manager: manager, timestamp: { $gt: from } }).then(feedback => {
    // Check if user exists
    if (!feedback) {
      return res.status(404).json({ feedbacknotfound: "feedback not found for user" });
    }
    res.send(feedback);
  });
});

module.exports = router;