const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());

// Define Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));