import express from 'express'
import { register,AuthUser } from '../controllers/Auth.js';




export  const EmployeeRouter = express.Router()


EmployeeRouter.post('/register',register);
EmployeeRouter.post('/login',AuthUser);
