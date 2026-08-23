import express from 'express'
import { getSettings, updateSettings } from '../controller/setting.controller.js';


const router = express.Router();

// Import your auth middleware if required (e.g., verifyToken / isAdmin)
// const { verifyToken } = require('../middleware/auth');


// Route: GET /api/settings
router.get('/', getSettings);

// Route: PUT /api/settings
router.put('/', updateSettings);

export default router;