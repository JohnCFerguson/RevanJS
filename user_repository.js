class UserRepository {
    constructor(dataAccess) {
        this.dataAccess = dataAccess;
    }

    createTable() {
        const sql = `
        CREATE TABLE IF NOT EXISTS users (
        obiwan_id INTEGER PRIMARY KEY,
        name VARCHAR,
        email VARCHAR,
        password_hash VARCHAR,
        supervisor_id INTEGER,
        CONSTRAINT fk_supervisor_id
            FOREIGN KEY (supervisor_id)
            REFERENCES users(obiwan_id)
        )`;
        return this.dataAccess.run(sql);
    }

    create_user(obiwan_id, name, email, password_hash, supervisor_id) {
        return this.dataAccess.run(`INSERT INTO users  (obiwan_id, name, email, password_hash, supervisor_id) 
                                    VALUES (?, ?, ?, ?, ?)`, [obiwan_id, name, email, password_hash, supervisor_id]);
    }
}

module.exports = UserRepository;
