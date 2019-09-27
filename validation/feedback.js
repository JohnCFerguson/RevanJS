const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateFeedbackInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.feedbackFor = !isEmpty(data.feedbackFor) ? data.feedbackFor : "";
  data.feedbackType = !isEmpty(data.feedbackType) ? data.feedbackType : "";
  data.feedback = !isEmpty(data.feedback) ? data.feedback : "";
  data.deliveredInPerson = !isEmpty(data.deliveredInPerson) ? data.deliveredInPerson : "";
  data.relatedLink = !isEmpty(data.relatedLink) ? data.relatedLink : "";
  data.sentiment = !isEmpty(data.sentiment) ? data.sentiment : "";
  data.deliveredBy = !isEmpty(data.deliveredBy) ? data.deliveredBy : "";

// feedbackFor checks
  if (data.feedbackFor === "") {
    errors.feedbackFor = "feedback for field is required" ;
  }
// feedbackType checks
  if (Validator.isEmpty(data.feedbackType)) {
    errors.feedbackType = "feedback type field is required";
  }
// feedback checks
  if (Validator.isEmpty(data.feedback)) {
    errors.feedback = "feedback field is required";
  }
// feedback checks
  if (Validator.isEmpty(data.deliveredInPerson)) {
    errors.deliveredInPerson = "Delivered in Person field is required";
  }
// feedback checks
  if (Validator.isEmpty(data.relatedLink)) {
    errors.relatedLink = "Related Link field is required";
  }
// feedback checks
  if (Validator.isEmpty(data.sentiment)) {
    errors.sentiment = "sentiment field is required";
  }
// feedback checks
  if (data.deliveredBy === "") {
    errors.deliveredBy = "Delivered By field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};