// const express = require('express');
// const { register, login, forgotPassword, resetPassword } = require('../controllers/authController');
// const router = express.Router();


// router.post('/register', register);

// router.post('/login', login);

// router.post('/forgot-password', forgotPassword);

// router.post('/reset-password', resetPassword);

// module.exports = router;


const express = require('express');
const {register,login,forgotPassword,resetPassword,getUserProfile} = require('../controllers/authController'); 


const router = express.Router();

// Authentication Routes
router.post('/register', register); // User registration
router.post('/login', login); // User login
router.post('/forgot-password', forgotPassword); // Forgot password
router.post('/reset-password', resetPassword); // Reset password

// User Profile Route
router.get('/userprofile', getUserProfile);

module.exports = router;
