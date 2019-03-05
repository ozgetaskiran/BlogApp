const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
const UserSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        require: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema, 'Users');