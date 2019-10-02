const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// Load input validation
const validateFeedbackInput = require("../../validation/feedback");

// Load Feedback model
const Feedback = require("../../models/Feedback");
const Users = require("../../models/User");

// @route POST api/feedback/submit
// @desc submit feedback
// @access Public
router.post("/submit", (req, res) => {

    console.log(typeof(req.body.feedbackFor.manager))

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
  const deliveredBy = req.body.deliveredBy
  const from = new Date(req.body.from);
  const now = new Date(Date.now());

  // Find feedback for user
  Feedback.find({ deliveredBy: deliveredBy, timestamp: { $gt: from } }).then(feedback => {
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
  console.log(req.body)
  const manager = req.body.feedbackFor;
  const from = new Date(req.body.from);
  const now = new Date(Date.now());

  // Find feedback for user
  Feedback.find({ 'feedbackFor.manager': manager.id, timestamp: { $gt: from } }).then(feedback => {
    // Check if feedback exists
    if (!feedback) {
      return res.status(404).json({ feedbacknotfound: "feedback not found for user" });
    }
    res.send(feedback);
  });
});

// route GET api/feedback/feedbackSubmittedForCount
// @desc get list of feedback based on auth'd users choice
// @access Public
router.get("/feedbackSubmittedForCount", (req,res) => {

//Get count of feedback submitted by a user
  Feedback.aggregate([
    {
      $group: {
        _id: "$feedbackFor.name",
        total: {$sum: 1}
      }
    }
  ]).then(feedback => {
    if (!feedback) {
      return res.status(404).json({ feedbacknotfound: "feedback not found for user" });
    }
    res.send(feedback);
  })
})

// route GET api/feedback/feedbackByCount
// @desc get list of feedback based on auth'd users choice
// @access Public
router.get("/feedbackSubmittedByCount", (req,res) => {

  //Get count of feedback submitted by a user
  Feedback.aggregate([
    {
      $group: {
        _id: "$deliveredBy.name",
        total: {$sum: 1}
      }
    }
  ]).then(feedback => {
    if (!feedback) {
      return res.status(404).json({ feedbacknotfound: "feedback not found for user" });
    }
    res.send(feedback);
  })
})

// route GET api/feedback/feedbackSubmittedForTeamCount
// @desc get list of feedback based on auth'd users choice
// @access Public
router.get("/feedbackSubmittedForTeamCount", (req,res) => {

  //Get count of feedback submitted by a user
  Users.aggregate([
    {
      $project: {
        "_id": {
          "$toString": "$_id"
        },
        "name": {
          "$toString": "$name"
        }
      }
    },
    {
      $lookup: {
        from: "feedback",
        localField: "_id",
        foreignField: "feedbackFor.manager",
        as: "feedbackForTeam"
      }
    }
  ]).then(feedback => {
    if (!feedback) {
      return res.status(404).json({ feedbacknotfound: "feedback not found for user" });
    }
    for (i in feedback) {
      feedback[i]['total'] = feedback[i]['feedbackForTeam'].length
    }
    res.send(feedback);
  })
})

// route GET api/feedback/feedbackTypeCount
// @desc get count of feedback by feedback type
// @access Public
router.get("/feedbackTypeCount", (req,res) => {

  //Get count of feedback submitted by a user
  Feedback.aggregate([
    {
      $group: {
        _id: "$feedbackType",
        total: {$sum: 1}
      }
    }
  ]).then(feedback => {
    if (!feedback) {
      return res.status(404).json({ feedbacknotfound: "feedback not found for user" });
    }
    res.send(feedback);
  })
})

// route GET api/feedback/feedbackDeliveredCount
// @desc get count of feedback by feedback type
// @access Public
router.get("/feedbackDeliveredCount", (req,res) => {

  //Get count of feedback submitted by a user
  Feedback.aggregate([
    {
      $group: {
        _id: "$deliveredInPerson",
        total: {$sum: 1}
      }
    }
  ]).then(feedback => {
    if (!feedback) {
      return res.status(404).json({ feedbacknotfound: "feedback not found for user" });
    }
    res.send(feedback);
  })
})

// route GET api/feedback/feedbackSentimentCount
// @desc get count of feedback sentiment by feedback
// @access Public
router.get("/feedbackSentimentCount", (req,res) => {

  //Get count of feedback submitted by a user
  Feedback.aggregate([
    {
      $group: {
        _id: "$sentiment",
        total: {$sum: 1}
      }
    }
  ]).then(feedback => {
    if (!feedback) {
      return res.status(404).json({ feedbacknotfound: "feedback not found for user" });
    }
    res.send(feedback);
  })
})

// route GET api/feedback/feedbackCount
// @desc get count of all feedback
// @access Public
router.get("/feedbackCount", (req,res) => {

  //Get count of feedback submitted by a user
  Feedback.aggregate([
    {
      $count: 'Total Feedback Submitted'
    }
  ]).then(feedback => {
    if (!feedback) {
      return res.status(404).json({ feedbacknotfound: "feedback not found for user" });
    }
    res.send(feedback);
  })
})


module.exports = router;