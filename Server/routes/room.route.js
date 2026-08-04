import express, { Router } from 'express'
import { ListRoom } from '../controller/room.controller.js'

const router = express.Router()

router.post("/list",ListRoom)

export default router