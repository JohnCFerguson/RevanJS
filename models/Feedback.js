const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const FeedbackSchema = new Schema({
    feedback: {
        type: String,
        required: true
    }
});
module.exports = Feedback = mongoose.model("feedback", FeedbackSchema, "feedback");