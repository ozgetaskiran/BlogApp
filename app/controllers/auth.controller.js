const bcrypt = require('bcrypt');
const User = require('../models/user.model.js');

// Create a new user
exports.authenticate = (req, res) => {

    if (!req.body.email || !req.body.password) {
        return res.status(400).send({
            message: "Missing user information."
        });
    }

    const password = req.body.password;
    const email = req.body.email;

    User.findOne({email: email})
        .exec(function (err, user) {
            if (err) {
                return callback(err)
            } else if (!user) {
                var err = new Error('User not found.');
                err.status = 401;
                return callback(err);
            }

            bcrypt.compare(password, user.password, function (err, result) {
                if (result === true) {
                    return res.status(200).send(user);
                } else {
                    return res.status(401).send({
                        message: "Unauthorized user."
                    });
                }
            })
        });

};