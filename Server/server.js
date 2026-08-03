import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import UserRoute from './routes/user.route.js';

const app = express();

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB Connected Successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

//Routes
app.use('/api/v1/user', UserRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server Successfully running on port ${PORT}`);
});