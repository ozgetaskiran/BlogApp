const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    title: String,
    text: String,
    private: Boolean,
    publisherId: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Post', PostSchema, 'Posts');