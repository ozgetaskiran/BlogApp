const User = require('../models/user.model.js');
const Post = require('../models/post.model.js');
const ObjectId = require('mongoose').Types.ObjectId;


// Create a new post
exports.create = (req, res) => {
    if(!req.body.title || !req.body.text || !req.body.private || !req.body.publisherId){
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
    .then((user)=> {
        if(!user){
            res.status(404).send({
                message: "Publisher not found."
            });
        } else{
            const post = new Post({
                title: req.body.title,
                text: req.body.text,
                private: req.body.private,
                publisherId: req.body.publisherId
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
    }).catch(function(error) {
        console.log(error);
    });
};

