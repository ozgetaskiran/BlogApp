const posts = require('../controllers/post.controller.js');
const express = require('express');
const router = express.Router();

// Create a new post
router.post('/', posts.create);

//Lists posts
//router.get('/', posts.list);

module.exports = router;