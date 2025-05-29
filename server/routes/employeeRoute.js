import express from 'express'
import { register,AuthUser, getAllUsers,getEmployeeById , logout, forgotPassword} from '../controllers/Auth.js';
import { forAdmin,forEmployee ,authenticateToken} from '../middleware/authMiddleware.js';

export  const EmployeeRouter = express.Router()

EmployeeRouter.post('/register',authenticateToken,forAdmin,register,);
EmployeeRouter.post('/login',AuthUser);
EmployeeRouter.get('/users',getAllUsers);
EmployeeRouter.get('/user-id',authenticateToken,getEmployeeById);
EmployeeRouter.post('/forgot-password',forgotPassword);
EmployeeRouter.get('/logout',logout);
