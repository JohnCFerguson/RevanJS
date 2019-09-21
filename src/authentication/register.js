const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    //Change empty fields into empty string so that validator works properly
    functions
        data.obiwan_id = !isEmpty(data.obiwan_id) ? data.name : "";
        data.name = !isEmpty(data.name) ? data.name : "";
        data.email = !isEmpty(data.email) ? data.email : "";
        data.manager_id = isEmpty(data.manager_id) ? data.manager_id : "";
        data.password = !isEmpty(data.password) ? data.password : "";
        data.password2 = !isEmpty(data.password2) ? data.password2 : "";

    //Check Names
    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
    }

    //Check Email
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    }
    else if (!Validator.isEmail(data.email)) {
        errors.email = "Emais is invalid";
    }

    //Check password
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "You must comfirm your password";
    }

    if (!Validator.isLength(data.password, { min: 6, max: 35 })) {
        errors.password = "Your password does not meet the lengths requirements";
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

