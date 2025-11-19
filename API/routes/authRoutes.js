const express = require('express');
const { signup, login, profile, logout } = require('../controllers/authController');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/profile', profile);
router.post('/logout', logout);

module.exports = router;
