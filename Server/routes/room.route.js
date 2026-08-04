import express, { Router } from 'express'
import { getRoom, ListRoom } from '../controller/room.controller.js'

const router = express.Router()

router.post("/list",ListRoom)

router.get("/getroom",getRoom)

export default router