import express from 'express'
import { createEvent } from '../controllers/EventCreation.js'
import { forAdmin,authenticateToken } from '../middleware/authMiddleware.js'


export const eventRouter = express.Router()
eventRouter.post('/create-event', authenticateToken, forAdmin, createEvent)