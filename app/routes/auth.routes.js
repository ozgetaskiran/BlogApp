const auth = require('../controllers/auth.controller.js');
const express = require('express');
const router = express.Router();

// User authentication
router.get('/', auth.authenticate);

module.exports = router;