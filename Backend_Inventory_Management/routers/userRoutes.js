const express = require('express');
const { signup, verifyOtp, login, requestPasswordReset, resetPassword } = require('../controllers/userController');
const User = require('../models/User'); // Assuming the User model is in models/User.js

const router = express.Router();

// Signup route
router.post('/signup', signup);

// OTP verification route
router.post('/verify-otp', verifyOtp);

// Login route
router.post('/login', login);

// Request for password reset
router.post('/request-password-reset', requestPasswordReset);

// Reset password route
router.post('/reset-password', resetPassword);

// Fetch user profile details
router.get('/profile/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password'); // Exclude password
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

