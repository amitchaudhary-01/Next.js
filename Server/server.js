import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import UserRoute from './routes/user.route.js';
import RoomRoute from './routes/room.route.js'
import NewsRoute from './routes/news.route.js'
import cookieParser from 'cookie-parser';

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));


app.use(express.json());
app.use(cookieParser());

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB Connected Successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

//Routes user
app.use('/api/v1/user', UserRoute);


///Router room
app.use("/api/v1/room",RoomRoute)


//Router News
app.use("/api/v1/news",NewsRoute)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server Successfully running on port ${PORT}`);
});