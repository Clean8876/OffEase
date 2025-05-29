import express from 'express';
import* as dotenv from "dotenv";
import connectDB from './config/db.js';
import { EmployeeRouter } from './routes/employeeRoute.js';
import { eventRouter } from './routes/eventCreationRoute.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';

import leaveRoutes from './routes/leaveRoutes.js';
import BalanceRouter from './routes/balanceRoute.js';




dotenv.config()
const app = express()
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT

app.use(cookieParser())
app.use(cors({
    origin: 'https://off-ease-q2sj.vercel.app',
    credentials: true, 
  }));


    app.get('/', (req, res) => {
    res.status(200).json('Server is running..............................');
  
});
app.use('/api/user',EmployeeRouter)
app.use('/api/event',eventRouter)
async function startServer() {

    connectDB()
    
    app.listen(port, () => {
        console.log(`Server is running on port http://localhost:${port}`);
    })
}
//leave routes
app.use("/api/leave", leaveRoutes);
//balance routes
app.use("/api/balance", BalanceRouter);

startServer()

