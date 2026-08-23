import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import UserRoute from './routes/user.route.js';
import RoomRoute from './routes/room.route.js';
import NewsRoute from './routes/news.route.js';
import SettingsRoutes from './routes/setting.routes.js'

const app = express();

// Middleware
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Database Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/v1/user', UserRoute);

app.use('/api/v1/room', RoomRoute);

app.use('/api/v1/news', NewsRoute);

app.use('/api/v1/settings', SettingsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Successfully running on port ${PORT}`);
});