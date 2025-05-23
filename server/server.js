import express from 'express';
import* as dotenv from "dotenv";
import connectDB from './config/db.js';
import cors from 'cors'


dotenv.config()
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT


app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true, // if you need to send cookies or HTTP authentication
  }));


    app.get('/', (req, res) => {
    res.send('Server is running..............................');
  
});

async function startServer() {

    connectDB()
    app.listen(port, () => {
        console.log(`Server is running on port http://localhost:${port}`);
    })
}


startServer()

