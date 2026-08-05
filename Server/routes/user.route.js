import express from 'express'

import Create, { Login } from '../controller/user.controller.js'

const router = express.Router();

router.post('/register', Create);

router.post('/login',Login)

export default router;
