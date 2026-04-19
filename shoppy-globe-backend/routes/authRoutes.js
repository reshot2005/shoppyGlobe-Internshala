const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// user registration
router.post('/register', registerUser);

// user login
router.post('/login', loginUser);

module.exports = router;
