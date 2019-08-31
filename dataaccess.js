// dataacccess.js

const sqlite3 = require('sqlite3').verbose();
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

    run(sql, params = []){
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, function (err) {
                if (err) {
                    console.log('Error runnin SQL ' + sql);
                    console.log(err);
                    reject(err);
                }
                else {
                    resolve({ id: this.lastID})
                }
            });
        });
    };
}

module.exports = AppDataAccess;