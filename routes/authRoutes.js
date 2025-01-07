const express = require('express');
const { register, login, forgotPassword, resetPassword ,searchBooking} = require('../controllers/authController');
const router = express.Router();


router.post('/register', register);

router.post('/login', login);

router.post('/forgot-password', forgotPassword);

router.post('/reset-password', resetPassword);

router.get('/search', searchBooking); 

module.exports = router;
