import express from "express";
import {
  initLeaveBalances,
  getMyLeaveBalances,
  submitLeaveRequest,
  getMyLeaveRequests,
  getLeaveRequestsWithBalances,
  updateLeaveRequestStatus,
  deleteLeaveRequest,
  getAllLeaveBalances,patchLeaveRequest
} from "../controllers/leaveController.js";
import { authenticateToken, forAdmin, forEmployee } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin initializes leave quotas on employee creation
router.post("/balance/init",authenticateToken, forAdmin,initLeaveBalances
);
// Admin  views All employee leave balances
router.get("/Allbalance",authenticateToken, forAdmin,getAllLeaveBalances
);

// Employee views their balances
router.get("/balance",authenticateToken, forEmployee,getMyLeaveBalances
);
// Employee submits a leave request
router.post("/request",authenticateToken, forEmployee,submitLeaveRequest
);
// Employee views their requests
router.get("/requests",authenticateToken, forEmployee,getMyLeaveRequests
);
// for admin Show all leave requests
router.get('/', authenticateToken, forAdmin, getLeaveRequestsWithBalances);
// Admin approves or rejects a leave request
router.patch('/requests/status', authenticateToken, forAdmin, updateLeaveRequestStatus);
//delete leave request
router.delete("/:id", authenticateToken, forEmployee, deleteLeaveRequest);

//update leave request
router.patch("/update/:id", authenticateToken, patchLeaveRequest);



export default router;
