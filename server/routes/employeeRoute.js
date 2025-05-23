import express from 'express'
import { register,AuthUser } from '../controllers/Auth.js';
import { forAdmin,forEmployee ,authenticateToken} from '../middleware/authMiddleware.js';




export  const EmployeeRouter = express.Router()


EmployeeRouter.post('/register',authenticateToken,forAdmin,register,);
EmployeeRouter.post('/login',AuthUser);
