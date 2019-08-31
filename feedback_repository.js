class FeedbackRepository {
    constructor(dataAccess) {
        this.dataAccess = dataAccess;
    }

    createTable() {
        const sql = `
        CREATE TABLE IF NOT EXISTS feedback (
            feedback_id INTEGER PRIMARY KEY AUTOINCREMENT,
            feedback_for_id INTEGER NOT NULL REFERENCES users(obiwan_id),
            submitter_id INTEGER NOT NULL REFERENCES users(obiwan_id),
            timestamp TIMESTAMP,
            feedback_type TEXT(20),
            feedback TEXT,
            delivered_in_person TEXT(3),
            related_issue TEXT,
            sentiment TEXT(12)
        )`;
        return this.dataAccess.run(sql);
    }

    add_feedback(feedback_id, feedback_for_id, submitter_id, timestamp,
        feedback_type, feedback, delivered_in_person, related_issue) {
        return this.dataAccess.run(`INSERT INTO feedback (feedback_id, feedback_for_id, submitter_id, timestamp,
                                    feedback_type, feedback, delivered_in_person, related_issue)
                                    VALUES (?, ?, ?, ?, ?)`, [feedback_id, feedback_for_id, submitter_id, timestamp,
                                    feedback_type, feedback, delivered_in_person, related_issue]);
    }
}

module.exports = FeedbackRepository;
