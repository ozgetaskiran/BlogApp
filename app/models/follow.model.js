import mongoose from "mongoose";

const FollowSchema = mongoose.Schema({
    followerId: String,
    followeeId: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Follow', FollowSchema);