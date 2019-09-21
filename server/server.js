const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const passport = require('passport');
const session = require('express-session');

const users = require('../routes/api/users');

const app = express();
const port = process.env.port || 3000;

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

const db = require('../config/config').mongoURI;

mongoose
  .connect(
    db,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  ).then (() => console.log("DB successfully connected"))
  .catch (err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("../config/passport")(passport);

app.use(passport.session);

app.use('/', express.static("./dist", {
  index: "index.html"
}));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname,'../dist/', '/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(port, () => console.log(`RevanJS app listening on port ${port}!`));
