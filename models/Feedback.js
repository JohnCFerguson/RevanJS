const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const FeedbackSchema = new Schema({
    timestamp: {
        type: Date,
        default: Date.now
    },
    feedbackFor: {
        type: Object,
        required: true
    },
    feedbackType: {
        type: String,
        required: true
    },
    feedback: {
        type: String,
        required: true
    },
    deliveredInPerson: {
        type: String,
        required: true
    },
    relatedLink: {
        type: String,
        required: true
    },
    sentiment: {
        type: String,
        required: true
    },
    deliveredBy: {
        type: Object,
        required: true
    }
});
module.exports = Feedback = mongoose.model("feedback", FeedbackSchema, "feedback");