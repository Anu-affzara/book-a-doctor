const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth'); // Middleware for authentication
const checkAdmin = require('../middleware/checkAdmin'); // Middleware to check admin role
const checkDoctor = require('../middleware/checkDoctor');

// Register user
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, phone, role } = req.body;

        // Log received data
        console.log('Received data:', req.body);

        // Check for missing fields
        if (!name || !email || !password || !phone || !role) {
            console.log('Missing fields');
            return res.status(400).json({ error: 'Please enter all fields' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('User already exists');
            return res.status(400).json({ error: 'User already exists' });
        }

        // Create and save the new user without hashing the password
        const user = new User({ name, email, password, phone, role });
        await user.save();

        // Log successful registration
        console.log('User registered successfully:', user);

        // Send response
        res.status(201).json({ message: 'User registered' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(400).json({ error: error.message });
    }
});

// Login user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Please enter all fields' });
        }

        const user = await User.findOne({ email });
        if (!user) throw new Error('User not found');

        // Log passwords for comparison
        console.log('Password entered:', password);
        console.log('Password stored:', user.password);

        // Compare passwords directly
        if (password !== user.password) {
            console.log('Invalid credentials');
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, role: user.role });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(400).json({ error: error.message });
    }
});

// Admin dashboard route
router.get('/admin-dashboard', auth, checkAdmin, (req, res) => {
    res.status(200).json({ message: 'Welcome to the admin dashboard!' });
});

// Doctor dashboard route
router.get('/doctor-dashboard', auth, checkDoctor, (req, res) => {
     res.status(200).json({ message: 'Welcome to the doctor dashboard!' });
});

module.exports = router;
