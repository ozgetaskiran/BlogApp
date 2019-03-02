const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: String,
    name: String,
    password: String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema, 'Users');