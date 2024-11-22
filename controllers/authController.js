// const nodemailer = require('nodemailer');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');
// const MaahotelDatas = require('../models/userModel');

// dotenv.config();

// // Function to send email
// const sendResetEmail = async (email, token) => {
//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: process.env.EMAIL_USERNAME,
//             pass: process.env.EMAIL_PASSWORD,
//         },
//     });

//     const mailOptions = {
//         from: process.env.EMAIL_USERNAME,
//         to: email,
//         subject: 'Password Reset',
//         text: `You requested for a password reset. Please use the following token to reset your password: ${token}`,
//     };

//     await transporter.sendMail(mailOptions);
// };

// // Function to log the current state and values of variables
// const debugLog = (message, value) => {
//     console.log(`${message}:`, value);
// };

// const cleanInput = (input) => {
//     const cleanedInput = {};
//     for (const key in input) {
//         cleanedInput[key.trim()] = input[key].trim();
//     }
//     return cleanedInput;
// };

// // Updated Username Validation
// const validateUsername = (username) => {
//     const letterOnly = /^[A-Za-z]+$/;
//     const hasUppercase = /[A-Z]/;
//     const hasLowercase = /[a-z]/;
    
//     return letterOnly.test(username) && (hasUppercase.test(username) || hasLowercase.test(username));
// };

// // Updated Password Validation
// const validatePassword = (password) => {
//     const hasUppercase = /[A-Z]/;
//     const hasLowercase = /[a-z]/;
//     const hasNumber = /\d/;
//     const hasSpecialChar = /[!@#$%^&*]/;

//     return password.length >= 8 && (hasUppercase.test(password) || hasLowercase.test(password)) && hasNumber.test(password) && hasSpecialChar.test(password);
// };

// // Email Validation
// const validateEmail = (email) => {
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailPattern.test(email);
// };

// // Register Function
// const register = async (req, res) => {
//     const { username, email, password } = cleanInput(req.body);

//     // Log incoming request
//     debugLog('Register request', req.body);

//     try {
//         if (!username || !email || !password) {
//             return res.status(400).json({ msg: 'Username, email, and password are required' });
//         }

//         // Validate username, email, and password
//         if (!validateUsername(username)) {
//             return res.status(400).json({ msg: 'Username must contain only letters and have at least one uppercase or one lowercase letter' });
//         }

//         if (!validateEmail(email)) {
//             return res.status(400).json({ msg: 'Invalid email format' });
//         }

//         if (!validatePassword(password)) {
//             return res.status(400).json({ msg: 'Password must be at least 8 characters long and include at least one uppercase or lowercase letter, one number, and one special character' });
//         }

//         // Convert username to uppercase
//         const uppercaseUsername = username.toUpperCase();

//         // Log input validation
//         debugLog('Username', uppercaseUsername);
//         debugLog('Email', email);
//         debugLog('Password', password);

//         let user = await MaahotelDatas.findOne({ $or: [{ username: uppercaseUsername }, { email }] });

//         if (user) {
//             return res.status(400).json({ msg: 'User already exists' });
//         }

//         user = new MaahotelDatas({ 
//             username: uppercaseUsername,
//             email,
//             password,
//         });

//         const salt = await bcrypt.genSalt(10);

//         // Log salt generation
//         debugLog('Generated salt', salt);

//         user.password = await bcrypt.hash(password, salt);

//         // Log password hashing
//         debugLog('Hashed password', user.password);

//         await user.save();

//         // Log successful registration
//         debugLog('User registered successfully', user);

//         res.status(201).json({ msg: 'User registered successfully' });
//     } catch (error) {
//         // Log the error stack for more details
//         console.error('Error during registration:', error.stack);
//         res.status(500).send('Server error');
//     }
// };


// const registerGet = async (req, res) => {
//     const { username, email} = cleanInput(req.query); // Use `req.query` for GET

//     try {
//         if (!username || !email ) {
//             return res.status(400).json({ msg: 'Username, email, and password are required' });
//         }

//         if (!validateUsername(username)) {
//             return res.status(400).json({ msg: 'Invalid username format' });
//         }

//         if (!validateEmail(email)) {
//             return res.status(400).json({ msg: 'Invalid email format' });
//         }

//        const uppercaseUsername = username.toUpperCase();

//         let user = await MaahotelDatas.findOne({ $or: [{ username: uppercaseUsername }, { email }] });

//         if (user) {
//             return res.status(400).json({ msg: 'User already exists' });
//         }

//         user = new MaahotelDatas({ username: uppercaseUsername, email });

//         const salt = await bcrypt.genSalt(10);
       
//         await user.save();

//         res.status(201).json({ msg: 'User registered successfully' });
//     } catch (error) {
//         console.error('Error during GET registration:', error.stack);
//         res.status(500).send('Server error');
//     }
// };


// // Login Function
// const login = async (req, res) => {
//     const { usernameOrEmail, password } = cleanInput(req.body);

//     // Log incoming request
//     debugLog('Login request', req.body);

//     try {
//         if (!usernameOrEmail || !password) {
//             return res.status(400).json({ msg: 'Username/Email and password are required' });
//         }

//         // Convert usernameOrEmail to uppercase
//         const uppercaseUsernameOrEmail = usernameOrEmail.toUpperCase();

//         // Log input validation
//         debugLog('Username/Email', uppercaseUsernameOrEmail);
//         debugLog('Password', password);

//         const user = await MaahotelDatas.findOne({
//             $or: [{ username: uppercaseUsernameOrEmail }, { email: usernameOrEmail }]
//         });

//         if (!user) {
//             return res.status(400).json({ msg: 'Invalid credentials' });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);

//         if (!isMatch) {
//             return res.status(400).json({ msg: 'Invalid credentials' });
//         }

//         const payload = {
//             user: {
//                 id: user.id,
//             },
//         };

//         jwt.sign(
//             payload,
//             process.env.JWT_SECRET,
//             { expiresIn: '1h' },
//             (err, token) => {
//                 if (err) {
//                     // Log JWT signing error
//                     console.error('JWT Signing Error:', err.stack);
//                     return res.status(500).send('Server error');
//                 }

//                 // Log generated token
//                 debugLog('Generated JWT', token);

//                 // Log successful login
//                 debugLog('User logged in successfully', user);

//                 // After successful login, redirect to membership form
//                 res.json({ msg: 'Login successful, redirecting to membership form', token });
//             }
//         );
//     } catch (error) {
//         // Log the error stack for more details
//         console.error('Error during login:', error.stack);
//         res.status(500).send('Server error');
//     }
// };

// // Function to generate a 6-character token with at least one number
// const generateToken = (length) => {
//     const chars = '0123456789';
//     let token = '';
//     let hasNumber = false;

//     while (token.length < length) {
//         const char = chars[Math.floor(Math.random() * chars.length)];
//         token += char;

//         if (/\d/.test(char)) {
//             hasNumber = true;
//         }
//     }

//     if (!hasNumber) {
//         const randomIndex = Math.floor(Math.random() * length);
//         token = token.slice(0, randomIndex) + '1' + token.slice(randomIndex + 1);
//     }

//     return token;
// };

// const forgotPassword = async (req, res) => {
//     const { email } = req.body;

//     try {
//         const user = await MaahotelDatas.findOne({ email });

//         if (!user) {
//             return res.status(400).json({ msg: 'User with this email does not exist' });
//         }

//         const token = generateToken(6); // Generate a token with exactly 6 characters
//         const expiry = Date.now() + 3600000; // 1 hour

//         user.resetToken = token;
//         user.resetTokenExpiry = expiry;
//         await user.save();

//         await sendResetEmail(user.email, token);

//         res.status(200).json({ msg: 'Password reset email sent' });
//     } catch (error) {
//         console.error('Error during password reset:', error.stack);
//         res.status(500).send('Server error');
//     }
// };

// const resetPassword = async (req, res) => {
//     const { token, newPassword } = cleanInput(req.body);

//     try {
//         if (!token || token.length !== 6) {
//             return res.status(400).json({ msg: 'Invalid token length' });
//         }

//         const user = await MaahotelDatas.findOne({
//             resetToken: token,
//             resetTokenExpiry: { $gt: Date.now() },
//         });

//         if (!user) {
//             return res.status(400).json({ msg: 'Invalid or expired token' });
//         }

//         const salt = await bcrypt.genSalt(10);
//         user.password = await bcrypt.hash(newPassword, salt);
//         user.resetToken = undefined;
//         user.resetTokenExpiry = undefined;
//         await user.save();

//         res.status(200).json({ msg: 'Password reset successful' });
//     } catch (error) {
//         console.error('Error during password reset:', error.stack);
//         res.status(500).send('Server error');
//     }
// };

// module.exports = {
//     register,
//     login,
//     forgotPassword,
//     resetPassword,
// };



const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const MaahotelDatas = require('../models/userModel');

dotenv.config();

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

// Register Function (POST)
const register = async (req, res) => {
    const { username, email, password } = cleanInput(req.body);

    // Log incoming request
    debugLog('Register request', req.body);

    try {
        if (!username || !email || !password) {
            return res.status(400).json({ msg: 'Username, email, and password are required' });
        }

        // Validate username, email, and password
        if (!validateUsername(username)) {
            return res.status(400).json({ msg: 'Username must contain only letters and have at least one uppercase or one lowercase letter' });
        }

        if (!validateEmail(email)) {
            return res.status(400).json({ msg: 'Invalid email format' });
        }

        if (!validatePassword(password)) {
            return res.status(400).json({ msg: 'Password must be at least 8 characters long and include at least one uppercase or lowercase letter, one number, and one special character' });
        }

        // Convert username to uppercase
        const uppercaseUsername = username.toUpperCase();

        // Log input validation
        debugLog('Username', uppercaseUsername);
        debugLog('Email', email);
        debugLog('Password', password);

        let user = await MaahotelDatas.findOne({ $or: [{ username: uppercaseUsername }, { email }] });

        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new MaahotelDatas({ 
            username: uppercaseUsername,
            email,
            password,
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        res.status(201).json({ msg: 'User registered successfully' });
    } catch (error) {
        console.error('Error during registration:', error.stack);
        res.status(500).send('Server error');
    }
};

// Register Function (GET)
const registerGet = async (req, res) => {
    const { username, email } = req.query; // Use `req.query` for GET

    try {
        if (!username || !email) {
            return res.status(400).json({ msg: 'Username and email are required' });
        }

        // Validate username and email
        if (!validateUsername(username)) {
            return res.status(400).json({ msg: 'Invalid username format' });
        }

        if (!validateEmail(email)) {
            return res.status(400).json({ msg: 'Invalid email format' });
        }

        const uppercaseUsername = username.toUpperCase();

        let user = await MaahotelDatas.findOne({ $or: [{ username: uppercaseUsername }, { email }] });

        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new MaahotelDatas({ username: uppercaseUsername, email });

        const salt = await bcrypt.genSalt(10);

        await user.save();

        res.status(201).json({ msg: 'User registered successfully' });
    } catch (error) {
        console.error('Error during GET registration:', error.stack);
        res.status(500).send('Server error');
    }
};

// Login Function
const login = async (req, res) => {
    const { usernameOrEmail, password } = cleanInput(req.body);

    try {
        if (!usernameOrEmail || !password) {
            return res.status(400).json({ msg: 'Username/Email and password are required' });
        }

        const uppercaseUsernameOrEmail = usernameOrEmail.toUpperCase();

        const user = await MaahotelDatas.findOne({
            $or: [{ username: uppercaseUsernameOrEmail }, { email: usernameOrEmail }]
        });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) {
                console.error('JWT Signing Error:', err.stack);
                return res.status(500).send('Server error');
            }

            debugLog('Generated JWT', token);

            res.json({ msg: 'Login successful', token });
        });
    } catch (error) {
        console.error('Error during login:', error.stack);
        res.status(500).send('Server error');
    }
};

// Forgot Password Function
const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await MaahotelDatas.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: 'User with this email does not exist' });
        }

        const token = generateToken(6);
        const expiry = Date.now() + 3600000; // 1 hour

        user.resetToken = token;
        user.resetTokenExpiry = expiry;
        await user.save();

        await sendResetEmail(user.email, token);

        res.status(200).json({ msg: 'Password reset email sent' });
    } catch (error) {
        console.error('Error during password reset:', error.stack);
        res.status(500).send('Server error');
    }
};

// Reset Password Function
const resetPassword = async (req, res) => {
    const { token, newPassword } = cleanInput(req.body);

    try {
        if (!token || token.length !== 6) {
            return res.status(400).json({ msg: 'Invalid token length' });
        }

        const user = await MaahotelDatas.findOne({
            resetToken: token,
            resetTokenExpiry: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid or expired token' });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        await user.save();

        res.status(200).json({ msg: 'Password reset successful' });
    } catch (error) {
        console.error('Error during password reset:', error.stack);
        res.status(500).send('Server error');
    }
};

module.exports = {
    register,
    registerGet,
    login,
    forgotPassword,
    resetPassword,
};
