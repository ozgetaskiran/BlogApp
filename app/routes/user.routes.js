const users = require('../controllers/user.controller.js');
const express = require('express');
const router = express.Router();

// Create a new User
router.post('/', users.create);

// Follow a User
router.put('/:userId/followees', users.addFollowee);

// Unfollow a User
router.put('/:userId/followees/:followeeId', users.removeFollowee);

module.exports = router;