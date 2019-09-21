const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data) {
    let errors = {};

    //Change empty fields into empty string so that validator works properly
    functions
        data.email = !isEmpty(data.email) ? data.email : "";
        data.password = !isEmpty(data.password) ? data.password : "";

    //Check email
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    }
    else if (!Validator.isEmail(data.email)) {
        errors.email = "Must be an email";
    }

    //Check password
    if (Validator.isEmpty(data.password)) {
        errors.email = "Password field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};