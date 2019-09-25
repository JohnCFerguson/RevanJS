const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateFeedbackList(data) {
    console.log(data);
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.feedbackFor = !isEmpty(data.feedbackFor) ? data.feedbackFor : {};
      // data.password = !isEmpty(data.password) ? data.password : "";
    // Email checks
    if (Validator.isEmpty(data.feedbackFor)) {
      errors.feedbackFor = "feedback for field is required";
    }

    return {
      errors,
      isValid: isEmpty(errors)
    };
  }