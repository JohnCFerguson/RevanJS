class UserFeedback {
    constructor(dataAccess) {
        this.dataAccess = dataAccess;
    }

    createTable() {
        const sql = `
        CREATE TABLE IF NOT EXISTS user_feedback (
            obiwan_id INTEGER REFERENCES users(obiwan_id),
            feedback_Id INTEGER REFERENCES feedback(feedback_id),
        CONSTRAINT pk_user_feedback
            PRIMARY KEY (obiwan_id, feedback_id)
        )`;
        return this.dataAccess.run(sql);
    }

    add_feedback(user_id, feedback_id) {
        this.dataAccess.run(`INSTERT INTO user_feedback (user_id, feedback_id) VALUES (?, ?)`,
                            [user_id, feedback_id]);

    }
}

module.exports = UserFeedback;
