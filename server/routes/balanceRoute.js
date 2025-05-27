import express from 'express';
import { getAllBalanceLeaves, getBalanceByEmployeeId } from '../controllers/BalanceLeave.js'; // make sure the path & extension are correct

const BalanceRouter = express.Router(); // ✅ use `Router()` not `router`

BalanceRouter.get('/get-all-leaves', getAllBalanceLeaves);
BalanceRouter.get('/get-balance/:id', getBalanceByEmployeeId);


export default BalanceRouter; // ✅ export the router
