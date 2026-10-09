import express from 'express'
import { getSettings, updateSettings } from '../controller/setting.controller.js';


const router = express.Router();


// Route: GET /api/settings
router.get('/', getSettings);

// Route: PUT /api/settings
router.put('/', updateSettings);

export default router;