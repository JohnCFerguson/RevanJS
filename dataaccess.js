// dataacccess.js

const sqlite3 = require('sqlite3');
const Promise = require('bluebird');

class AppDataAccess {
    constructor(dbFilePath) {
        this.db = new sqlite3.Database(dbFilePath, (err) => {
            if (err) {
                console.log('Unable to connect to DB', err);
            } 
            else {
                console.log('Connected to DB');
            }
        });
    }
}

module.exports = AppDataAccess;