import express from 'express';
import Create, { Login, LogOut } from '../controller/user.controller.js';
import { verifyAdmin } from '../middleware/verifyAdmin.js';

const router = express.Router();

// Public Routes
router.post('/register', Create);
router.post('/login', Login);
router.get('/logout', LogOut);

// Protected Admin Route Example
router.get('/admin/dashboard', verifyAdmin, (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Welcome to the Admin Dashboard",
        adminData: req.user // Contains id, email, and role from the decoded JWT token
    });
});

export default router;