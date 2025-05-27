import express from 'express';
import { getAllBalanceLeaves } from '../controllers/BalanceLeave.js'; // make sure the path & extension are correct

const BalanceRouter = express.Router(); // ✅ use `Router()` not `router`

BalanceRouter.get('/get-all-leaves', getAllBalanceLeaves);


export default BalanceRouter; // ✅ export the router
