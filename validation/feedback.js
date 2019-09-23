const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateFeedbackInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.feedback = !isEmpty(data.feedback) ? data.feedback : "";
  // data.password = !isEmpty(data.password) ? data.password : "";
// Email checks
  if (Validator.isEmpty(data.feedback)) {
    errors.feedback = "feedback field is required";
  }

return {
    errors,
    isValid: isEmpty(errors)
  };
};