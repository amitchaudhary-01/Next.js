import createNews, { getNews } from '../controller/news.controller.js'
import express from 'express'

const router = express.Router()

router.post('/create',createNews)

router.get('/getnews',getNews)

export default router
