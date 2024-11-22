const express = require('express');
const { register, login, forgotPassword, resetPassword, registerGet } = require('../controllers/authController');
const router = express.Router();


router.post('/register', register);

router.get('/registerget',  registerGet);

router.post('/login', login);

router.post('/forgot-password', forgotPassword);

router.post('/reset-password', resetPassword);

module.exports = router;
