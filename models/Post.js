const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  user: { // The user who made the post
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: { // Store the user's name for easy display
    type: String,
    required: true
  },
  text: { // The content of the post
    type: String,
    required: true
  },
  createdAt: { // The time it was created
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Post', PostSchema);