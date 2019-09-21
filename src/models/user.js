const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Creating User Schema
const UserSchema = new Schema ({
    obiwan_id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    manager_id: {
        type: Number,
        required: false
    }
});


module.exports = User = mongoose.model('users', UserSchema);
