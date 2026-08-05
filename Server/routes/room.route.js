import express, { Router } from 'express';
import { getRoom, ListRoom } from '../controller/room.controller.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected route: Only authenticated users can list/create a room
router.post("/list", ListRoom);

// Public route: Anyone can view the rooms
router.get("/getroom", verifyToken, getRoom);

export default router;