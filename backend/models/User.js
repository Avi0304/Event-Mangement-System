const mongoose = require('mongoose');
const brcypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name']
    },
    email: {
        type: String,
        required: [true, 'Please provide a email'],
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
    }
});


module.exports = mongoose.model('User', UserSchema);