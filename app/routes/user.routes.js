const users = require('../controllers/user.controller.js');
const express = require('express');
const router = express.Router();

// Create a new User
router.post('/', users.create);

// Get followee list
router.get('/:userId/followees', users.getFollowees);

// Get followee list
router.get('/:userId/suggestions', users.getSuggestions);

// Follow a User
router.put('/:userId/followees', users.addFollowee);

// Unfollow a User
router.delete('/:userId/followees/:followeeId', users.removeFollowee);

//Get posts of a user
router.get('/:userId/posts', users.getPosts);

//Get posts of a user's followees
router.get('/:userId/followees/-/posts', users.getFolloweePosts);

module.exports = router;