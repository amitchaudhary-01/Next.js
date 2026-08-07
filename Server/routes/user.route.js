import express from 'express'

import Create, { Login, LogOut } from '../controller/user.controller.js'

const router = express.Router();

router.post('/register', Create);

router.post('/login',Login)

router.get('/logout',LogOut)

export default router;
