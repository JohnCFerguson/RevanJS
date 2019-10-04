const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const FeedbackSchema = new Schema({
    timestamp: {
        type: Date,
        default: Date.now
    },
    feedbackFor: {
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        manager: {
            type: String,
            required: false
        }

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
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        manager: {
            type: String,
            required: false
        }
    }
});
module.exports = Feedback = mongoose.model("feedback", FeedbackSchema, "feedback");