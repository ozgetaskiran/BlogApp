const users = require('../controllers/user.controller.js');
const express = require('express');
const router = express.Router();

// Create a new User
router.post('/', users.create);

// Follow a User
router.put('/:userId/followees', users.addFollowee);

// Unfollow a User
router.delete('/:userId/followees/:followeeId', users.removeFollowee);

//Get porsts of a user
router.get('/:userId/posts', users.getPosts);

//Get posts of a user's followees
router.get('/:userId/followees/:fol/posts', users.getFolloweePosts);

module.exports = router;