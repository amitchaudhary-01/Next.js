import express from 'express'

import Create from '../controller/user.controller.js'

const router = express.Router();

router.post('/register', Create);

export default router;
