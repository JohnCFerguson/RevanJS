const mongoose = require('mongoose');
//tell mongoose to use es6 implementation of promises
mongoose.Promise = global.Promise;

// DB Config
const db = require("../config/config").mongoURI;

mongoose.connect(db,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
mongoose.connection
    .once('open', () => console.log('Connected!'))
    .on('error', (error) => {
        console.warn('Error : ',error);
    });