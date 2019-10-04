const assert = require('assert');
const User = require('../models/User.js');
const bcrypt = require("bcryptjs");

let email;
let password;

beforeEach(() => {
    email = "test@test.com";
})

describe('Finding User (login function)', () => {
    it('find user with email and checks hash of password', (done) => {
        password = 'test123';
        User.findOne({ email }).then(user => {
            bcrypt.compare(password, user.password).then(isMatch => {
                assert(isMatch)
                done();
            })
          });
    });
    it('find user with email and checks hash of password', (done) => {
        password = 'test';
        User.findOne({ email }).then(user => {
            bcrypt.compare(password, user.password).then(isMatch => {
                assert(!isMatch)
                done();
            })
          });
    });
});