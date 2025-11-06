const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();
console.log("My server is reading this string:", process.env.MONGO_URI);
const app = express();

// --- Middleware ---
app.use(cors()); 
app.use(express.json());

// --- Database Connection ---
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.error('MongoDB connection error:', err));

// --- API Routes ---
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));

// --- Start the Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));