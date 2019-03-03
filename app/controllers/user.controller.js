const User = require('../models/user.model.js');
const Follow = require('../models/follow.model.js');
const ObjectId = require('mongoose').Types.ObjectId;


// Create a new user
exports.create = (req, res) => {
    if(!req.body.name || !req.body.email || !req.body.password){
        return res.status(422).send({
            message: "Missing user information."
        });
    }

    const user = new User({
        name : req.body.name,
        password : req.body.password,
        email : req.body.email
    });

    user.save()
        .then(data => {
            res.send(data);
        }).catch(err=> {
        res.status(500).send({
            message: err.message
        });
    });

};


// Add followee to the user indentified by userId in the request
exports.addFollowee = (req, res) => {
    var followerId = req.params.userId;
    var followeeId = req.body.followeeId;

    User.findById(followerId, function (err, data) {
        if(err) {
            res.status(500).send({
                message: err.message
            });
        }else if(!data){
            res.status(404).send({
                message: "User not found."
            });
        }
    });

    if(!followeeId){
        return res.status(400).send({
            message: "Missing followeeId."
        });
    }else if(!ObjectId.isValid(followeeId)){
        return res.status(400).send({
            message: "Invalid followee id."
        });
    }

    const follow = new Follow({
        followerId : followerId,
        followeeId : followeeId
    });

    follow.save()
        .then(data => {
            res.send(data);
        }).catch(err=> {
        res.status(500).send({
            message: err.message
        });
    });
};

// Remove followee identified by followeeId in the request from the user with userId in the request
exports.removeFollowee = (req, res) => {

    var followerId = req.params.userId;
    var followeeId = req.params.followeeId;

    if(!ObjectId.isValid(followerId)){
        return res.status(400).send({
            message: "Invalid user id."
        });
    }

    User.findById(followerId, function (err, data) {
        if(err) {
            res.status(500).send({
                message: err.message
            });
        }else if(!data){
            res.status(404).send({
                message: "User not found."
            });
        }else{
            Follow.deleteOne({ followerId : followerId, followeeId : followeeId}, function(err){
                if (err){
                    res.status(500).send({
                        message: err.message});
                }else{
                    res.status(204).send();
                }

            })
        }

    });

};
