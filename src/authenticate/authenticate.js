const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    //Change empty fields into empty string so that validator works properly
    data.obiwan_id = !isEmpty(data.obiwan_id) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
}