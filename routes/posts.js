const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Post = require('../models/Post');
const User = require('../models/User');

// @route   POST /api/posts
// @desc    Create a new post
router.post('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    const newPost = new Post({
      text: req.body.text,
      userName: user.name,
      user: req.user.id
    });
    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/posts
// @desc    Get all posts
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;