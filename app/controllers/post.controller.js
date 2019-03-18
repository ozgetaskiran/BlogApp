const User = require('../models/user.model.js');
const Post = require('../models/post.model.js');
const ObjectId = require('mongoose').Types.ObjectId;


// Create a new post
exports.create = (req, res) => {
    if (!req.body.title || !req.body.text || !req.body.publisherId) {
        return res.status(400).send({
            message: "Missing post information."
        });
    }

    if (!ObjectId.isValid(req.body.publisherId)) {
        return res.status(400).send({
            message: "Invalid publisher id."
        });
    }

    User.findById(req.body.publisherId)
        .then((user) => {
            if (!user) {
                res.status(404).send({
                    message: "Publisher not found."
                });
            } else {
                const post = new Post({
                    title: req.body.title,
                    text: req.body.text,
                    private: req.body.private,
                    publisherId: req.body.publisherId,
                    publisherName: req.body.publisherName
                });

                post.save()
                    .then(data => {
                        res.status(201).send(data);
                    }).catch(err => {
                    res.status(500).send({
                        message: err.message
                    });
                });
            }
        }).catch(function (error) {
        console.log(error);
    });
};

//Lists posts
exports.list = (req, res) => {
    if (!ObjectId.isValid(req.body.publisherId)) {
        return res.status(400).send({
            message: "Invalid publisher id."
        });
    }

    if (!ObjectId.isValid(req.body.viewerId)) {
        return res.status(400).send({
            message: "Invalid viewer id."
        });
    }

    User.findById(req.body.publisherId)
        .then((user) => {
            if (!user) {
                res.status(404).send({
                    message: "Publisher not found."
                });
            } else {
                Post.find({
                    publisherId: req.body.publisherId
                }, function (err, data) {
                }).then((data) => {
                    if (!data) {
                        res.status(404).send({
                            message: "No posts."
                        });
                    } else {
                        res.status(200).send(data);
                    }
                })

            }
        }).catch(function (error) {
        if (error) {
            res.status(500).send({
                message: error.message
            });
        }
    });
};
