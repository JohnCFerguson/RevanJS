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
    console.log(req.body);
    const feedback = new Feedback({
        feedbackFor: req.body.feedbackFor,
        feedback: req.body.feedback
    });

    console.log(feedback);

    feedback
        .save()
        .then(feedback => res.json(feedback))
        .catch(err => console.log(err));
});


//   // @route POST api/users/login
// // @desc Login user and return JWT token
// // @access Public
// router.post("/login", (req, res) => {
//     // Form validation
//   const { errors, isValid } = validateLoginInput(req.body);
//   // Check validation
//     if (!isValid) {
//       return res.status(400).json(errors);
//     }
//   const email = req.body.email;
//     const password = req.body.password;
//   // Find user by email
//     User.findOne({ email }).then(user => {
//       // Check if user exists
//       if (!user) {
//         return res.status(404).json({ emailnotfound: "Email not found" });
//       }
//   // Check password
//       bcrypt.compare(password, user.password).then(isMatch => {
//         if (isMatch) {
//           // User matched
//           // Create JWT Payload
//           const payload = {
//             id: user.id,
//             name: user.name
//           };
//   // Sign token
//           jwt.sign(
//             payload,
//             keys.secretOrKey,
//             {
//               expiresIn: 31556926 // 1 year in seconds
//             },
//             (err, token) => {
//               res.json({
//                 success: true,
//                 token: "Bearer " + token
//               });
//             }
//           );
//         } else {
//           return res
//             .status(400)
//             .json({ passwordincorrect: "Password incorrect" });
//         }
//       });
//     });
//   });

  module.exports = router;