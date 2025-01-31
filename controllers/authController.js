const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const MaahotelDatas = require('../models/userModel');

dotenv.config();

const generateToken = () => Math.floor(100000 + Math.random() * 900000).toString();

// Function to send email
const sendResetEmail = async (email, token) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: 'Password Reset',
        text: `You requested a password reset. Please use the following token to reset your password: ${token}`,
    };

    await transporter.sendMail(mailOptions);
};

// Function to log the current state and values of variables
const debugLog = (message, value) => {
    console.log(`${message}:`, value);
};

const cleanInput = (input) => {
    const cleanedInput = {};
    for (const key in input) {
        if (input[key]) {
            cleanedInput[key.trim()] = input[key].trim();
        }
    }
    return cleanedInput;
};

// Updated Username Validation
const validateUsername = (username) => {
    const letterOnly = /^[A-Za-z]+$/;
    const hasUppercase = /[A-Z]/;
    const hasLowercase = /[a-z]/;
    
    return letterOnly.test(username) && (hasUppercase.test(username) || hasLowercase.test(username));
};

// Updated Password Validation
const validatePassword = (password) => {
    const hasUppercase = /[A-Z]/;
    const hasLowercase = /[a-z]/;
    const hasNumber = /\d/;
    const hasSpecialChar = /[!@#$%^&*]/;

    return password.length >= 8 && (hasUppercase.test(password) || hasLowercase.test(password)) && hasNumber.test(password) && hasSpecialChar.test(password);
};

// Email Validation
const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
};

// Register Function
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ msg: 'All fields are required' });
        }

        const userExists = await User.findOne({ $or: [{ username }, { email }] });

        if (userExists) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ msg: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Login Function
const login = async (req, res) => {
    try {
        const { usernameOrEmail, password } = req.body;
        const user = await User.findOne({
            $or: [{ username: usernameOrEmail.toUpperCase() }, { email: usernameOrEmail }]
        });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ msg: 'Login successful', token, user: { username: user.username, email: user.email } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Forgot Password
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }

        const token = generateToken();
        user.resetToken = token;
        user.resetTokenExpiry = Date.now() + 3600000;

        await user.save();
        await sendResetEmail(user.email, token);

        res.json({ msg: 'Password reset email sent' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Reset Password
const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        const user = await User.findOne({ resetToken: token, resetTokenExpiry: { $gt: Date.now() } });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid or expired token' });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;

        await user.save();

        res.json({ msg: 'Password reset successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};

const searchBooking = async (req, res) => {
    try {
        const { query } = req.query; 
        const user  = await MaahotelDatas.find({
            $or: [
                { username: new RegExp(query, 'i') },
                { email: new RegExp(query, 'i') },
               
               
            ]
        });
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
};
module.exports = {
    register,
    login,
    forgotPassword,
    resetPassword,
    searchBooking,
};
