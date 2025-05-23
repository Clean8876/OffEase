import express from 'express';
import* as dotenv from "dotenv";
import connectDB from './config/db.js';
import { EmployeeRouter } from './routes/employeeRoute.js';
import cors from 'cors'


dotenv.config()
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT


app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true, 
  }));


    app.get('/', (req, res) => {
    res.send('Server is running..............................');
  
});
app.use('/api/user',EmployeeRouter)
async function startServer() {

    connectDB()
    
    app.listen(port, () => {
        console.log(`Server is running on port http://localhost:${port}`);
    })
}


startServer()

