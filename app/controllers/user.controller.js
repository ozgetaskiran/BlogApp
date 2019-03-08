const User = require('../models/user.model.js');
const Follow = require('../models/follow.model.js');
const Post = require('../models/post.model.js');
const ObjectId = require('mongoose').Types.ObjectId;
const bcrypt = require('bcrypt');


// Create a new user
exports.create = (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).send({
            message: "Missing user information."
        });
    }

    const user = new User({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
    });

    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        user.save()
            .then(data => {
                res.status(201).send(data);
            }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
    })


};

// Add followee to the user indentified by userId in the request
exports.addFollowee = (req, res) => {
    var followerId = req.params.userId;
    var followeeId = req.body.followeeId;

    if (!ObjectId.isValid(followerId)) {
        return res.status(400).send({
            message: "Invalid user id."
        });
    }

    var userFound = false;
    User.findById(followerId, function (err, data) {
    }).then(data => {
        if (!data) {
            res.status(404).send({
                message: "User not found."
            });
        } else {
            if (!followeeId) {
                res.status(400).send({
                    message: "Missing followeeId."
                });
            } else if (!ObjectId.isValid(followeeId)) {
                res.status(400).send({
                    message: "Invalid followee id."
                });
            }
            const follow = new Follow({
                followerId: followerId,
                followeeId: followeeId
            });

            follow.save()
                .then(data => {
                    res.status(204).send(data);
                }).catch(err => {
                res.status(500).send({
                    message: err.message
                });
            });
        }
    }).catch(function (error) {
        if (err) {
            res.status(500).send({
                message: err.message
            });
        }
    });
}

// Remove followee identified by followeeId in the request from the user with userId in the request
exports.removeFollowee = (req, res) => {
    var followerId = req.params.userId;
    var followeeId = req.params.followeeId;

    if (!ObjectId.isValid(followerId)) {
        return res.status(400).send({
            message: "Invalid user id."
        });
    }

    User.findById(followerId, function (err, data) {
        if (err) {
            res.status(500).send({
                message: err.message
            });
        } else if (!data) {
            res.status(404).send({
                message: "User not found."
            });
        } else {
            Follow.deleteOne({followerId: followerId, followeeId: followeeId}, function (err) {
                if (err) {
                    res.status(500).send({
                        message: err.message
                    });
                } else {
                    res.status(204).send();
                }

            })
        }

    });

};

//get posts of the user identified by userId in the request
exports.getPosts = (req, res) => {
    var userId = req.params.userId;

    if (!ObjectId.isValid(userId)) {
        return res.status(400).send({
            message: "Invalid user id."
        });
    }

    var userFound = false;
    User.findById(userId, function (err, data) {
    }).then(data => {
        if (!data) {
            res.status(404).send({
                message: "User not found."
            });
        } else {
            Post.find({'publisherId': userId}, function (err, posts) {
                if (err) {
                    onErr(err, callback);
                } else {
                    return res.status(200).send(posts);
                }
            });
        }
    }).catch(function (err) {
        if (err) {
            res.status(500).send({
                message: err.message
            });
        }
    });
};

//get public posts of the followees the user identified by userId in the request
exports.getFolloweePosts = (req, res) => {
    var userId = req.params.userId;

    if (!ObjectId.isValid(userId)) {
        return res.status(400).send({
            message: "Invalid user id."
        });
    }

    var userFound = false;
    User.findById(userId, function (err, data) {
    }).then(data => {
        if (!data) {
            res.status(404).send({
                message: "User not found."
            });
        } else {
            Follow.find({'followerId': userId}, "followeeId", function (err, followees) {
                if (err) {
                    res.status(500).send({
                        message: err.message
                    });
                } else {
                    var followeeIds = [];
                    for (l in followees) {
                        followeeIds.push(followees[l].followeeId);
                    }
                    Post.find({'publisherId': {$in: followeeIds}, 'private': {$nin: true}}, function (err, posts) {
                        if (err) {
                            res.status(500).send({
                                message: err.message
                            });
                        } else {
                            res.status(200).send(posts);
                        }
                    });
                }
            });
        }
    }).catch(function (err) {
        if (err) {
            res.status(500).send({
                message: err.message
            });
        }
    });

};

exports.getFollowees = (req, res) => {
    var followerId = req.params.userId;

    Follow.find({followerId: followerId}, function (err, followees) {
    }).then(followees => {
        if (!followees) {
            res.status(200).send({
                message: "No users."
            });
        } else {
            var followeeIds = [];
            for (l in followees) {
                followeeIds.push(followees[l].followeeId);
            }

            User.find({'_id': {$in: followeeIds}}, function (err, users) {
                if (err) {
                    res.status(500).send({
                        message: err.message
                    });
                } else {
                    res.status(200).send(users);
                }
            });
        }
    }).catch(function (err) {
        if (err) {
            res.status(500).send({
                message: err.message
            });
        }
    });
};

exports.getSuggestions = (req, res) => {
    var followerId = req.params.userId;

    Follow.find({followerId: followerId}, function (err, followees) {
    }).then(followees => {
        if (!followees) {
            res.status(200).send({
                message: "No users."
            });
        } else {
            var exceptedIds = [];
            for (l in followees) {
                exceptedIds.push(followees[l].followeeId);
            }
            exceptedIds.push(followerId);
            User.find({'_id': {$nin: exceptedIds}}, function (err, users) {
                if (err) {
                    res.status(500).send({
                        message: err.message
                    });
                } else {
                    res.status(200).send(users);
                }
            });
        }
    }).catch(function (err) {
        if (err) {
            res.status(500).send({
                message: err.message
            });
        }
    });
};
