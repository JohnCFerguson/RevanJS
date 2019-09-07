const express = require('express');
const path = require('path');
const database_object = require('../dataAccess');
const user_table = require('../user_repository');
const feedback_table = require('../feedback_repository');

const app = express();
const port = 3000;

const dataAccessObject = new database_object('./database.sqlite3');
const users = new user_table(dataAccessObject);
const feedback = new feedback_table(dataAccessObject);

users.createTable();
feedback.createTable();


app.use('/', express.static("./dist", {
  index: "index.html"
}));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(port, () => console.log(`RevanJS app listening on port ${port}!`));
