const User = require('../models/user.model.js');

// Create and Save a new Note
exports.create = (req, res) => {
    if(!req.body.name){
        return res.status(400).send({
            message: "Name cannot be empty"
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

};

// Remove followee identified by followeeId in the request from the user with userId  in the request
exports.removeFollowee = (req, res) => {

};
