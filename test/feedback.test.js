const assert = require('assert');
const Feedback = require("../models/Feedback");

let feedbackFor;

beforeEach(() => {
    feedbackFor = {
        id: "5d88448e314d374cc8bbfc52",
        name: "John Ferguson",
        manager: "NA"
    }
})

describe('Finding feedback list', () => {
    it('Finds feedback list by user', (done) => {
        Feedback.find({ feedbackFor: feedbackFor}).then(feedback => {
            assert(feedback);
            done();
        })
    });
});

