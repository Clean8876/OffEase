import express from 'express'
import { createEvent,getEvent,deleteEvent,updateEvent,getTodayEventas } from '../controllers/EventCreation.js'
import { forAdmin,authenticateToken } from '../middleware/authMiddleware.js'


export const eventRouter = express.Router()
eventRouter.post('/create-event', authenticateToken, forAdmin, createEvent)
eventRouter.get('/get-event', authenticateToken, getEvent)
eventRouter.get('/getTodayEvent', authenticateToken, getTodayEventas)
eventRouter.patch('/update/:id', authenticateToken,forAdmin, updateEvent);
eventRouter.delete('/events/:id', authenticateToken,forAdmin, deleteEvent);