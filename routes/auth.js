const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

// @route   POST /api/auth/register
// @desc    Register a new user
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    user = new User({ name, email, password });
    await user.save();
    const payload = { user: { id: user.id } };
    jwt.sign(payload, JWT_SECRET, { expiresIn: '3h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate (log in) a user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    const payload = { user: { id: user.id } };
    jwt.sign(payload, JWT_SECRET, { expiresIn: '3h' }, (err, token) => {
      if (err) throw err;
      res.json({ token, user: { name: user.name, id: user.id } });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;