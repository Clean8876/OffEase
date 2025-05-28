import LeaveType from "../models/leaveType.js";
import LeaveBalance from "../models/leaveBalance.js";
import LeaveRequest from "../models/leaveRequest.js";

// ADMIN: initialize balances for a new employee
export const initLeaveBalances = async (req, res) => {
  try {
    const { employeeId, quotas } = req.body;
    const types = await LeaveType.find({
      name: { $in: quotas.map(q => q.leaveTypeName) }
    });

    const ops = quotas.map(q => {
      const lt = types.find(t => t.name === q.leaveTypeName);
      if (!lt) return null;
      return {
        updateOne: {
          filter: { employee: employeeId, leaveType: lt._id },
          update: {
            employee: employeeId,
            leaveType: lt._id,
            totalDays: q.totalDays,
            remainingDays: q.totalDays
          },
          upsert: true
        }
      };
    }).filter(Boolean);

    await LeaveBalance.bulkWrite(ops);
    res.status(200).json({ message: "Leave balances initialized" });
  } catch (err) {
    res.status(500).json({ message: "Error initializing balances", error: err.message });
  }
};

//GetBy ID(EMPLOYEE) or   view own leave balances
export const getMyLeaveBalances = async (req, res) => {
  try {
    const balances = await LeaveBalance
      .find({ employee: req.user.id })
      .populate("leaveType", "name advanceNoticeDays autoApproval");

    let totalRemaining = 0;
    let totalUsed = 0;
    const leaveDetails = {};

    balances.forEach(balance => {
      const used = balance.totalDays - balance.remainingDays;
      totalRemaining += balance.remainingDays;
      totalUsed += used;

      leaveDetails[balance.leaveType.name] = {
        leaveType: balance.leaveType.name,
        advanceNoticeDays: balance.leaveType.advanceNoticeDays,
        autoApproval: balance.leaveType.autoApproval,
        totalDays: balance.totalDays,
        usedDays: used,
        remainingDays: balance.remainingDays,
      };
    });

    res.json({
      employee: req.user.id,
      totalRemaining,
      totalUsed,
      leaveDetails
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching balances", error: err.message });
  }
};

// EMPLOYEE: submit a leave request
export const submitLeaveRequest = async (req, res) => {
  try {
    const { leaveTypeId, startDate, endDate, reason, description } = req.body;

    const leaveType = await LeaveType.findById(leaveTypeId);
    if (!leaveType) return res.status(400).json({ message: "Invalid leaveTypeId" });

    const now = new Date();
    const start = new Date(startDate);
    const notice = Math.ceil((start - now) / (1000 * 60 * 60 * 24));
    if (notice < leaveType.advanceNoticeDays) {
      return res.status(400).json({ message: `Must apply ${leaveType.advanceNoticeDays} days in advance for ${leaveType.name}` });
    }

    const requestedDays = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) + 1;
    const balance = await LeaveBalance.findOne({ employee: req.user.id, leaveType: leaveTypeId });

    if (!balance || balance.remainingDays < requestedDays) {
      return res.status(400).json({
        message: `Insufficient ${leaveType.name} leave balance. Available: ${balance ? balance.remainingDays : 0}, Requested: ${requestedDays}`
      });
    }

    const status = leaveType.autoApproval ? "approved" : "pending";
    const reqDoc = await LeaveRequest.create({
      employee: req.user.id,
      leaveType: leaveTypeId,
      startDate,
      endDate,
      reason,
      description,
      status
    });

    if (status === "approved") {
      await LeaveBalance.findOneAndUpdate(
        { employee: req.user.id, leaveType: leaveTypeId },
        { $inc: { remainingDays: -requestedDays } }
      );
    }

    res.status(201).json(reqDoc);
  } catch (err) {
    res.status(500).json({ message: "Error submitting leave request", error: err.message });
  }
};

// EMPLOYEE: view own requests
export const getMyLeaveRequests = async (req, res) => {
  try {
    const requests = await LeaveRequest
      .find({ employee: req.user.id })
      .populate("leaveType", "name")
      .populate("reviewedBy", "firstName lastName");
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: "Error fetching requests", error: err.message });
  }
};

// ADMIN: get all leave requests with balances
export const getLeaveRequestsWithBalances = async (req, res) => {
  try {
    const { status = 'pending' } = req.query;
    const validStatuses = ['pending', 'approved', 'rejected', 'all'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status filter' });
    }

    const condition = status === 'all' ? {} : { status };

    const leaveRequests = await LeaveRequest.find(condition)
      .populate('employee', 'Firstname Lastname email department')
      .populate('leaveType', 'name')
      .sort({ createdAt: -1 });

    const balances = await LeaveBalance.find()
      .populate('leaveType', 'name')
      .populate('employee', '_id');

    const balanceMap = {};
    for (const balance of balances) {
      if (!balance.employee || !balance.leaveType) continue;
      const empId = balance.employee._id.toString();
      if (!balanceMap[empId]) balanceMap[empId] = {};
      balanceMap[empId][balance.leaveType.name] = {
        total: balance.totalDays,
        remaining: balance.remainingDays
      };
    }

    const enrichedRequests = leaveRequests.map(req => {
      const empId = req.employee?._id?.toString();
      return {
        ...req._doc,
        leaveBalances: balanceMap[empId] || {}
      };
    });

    res.status(200).json(enrichedRequests);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve leave requests with balances', error: err.message });
  }
};

// ADMIN: approve or reject a leave request
export const updateLeaveRequestStatus = async (req, res) => {
  try {
    const { requestId, status } = req.body;
    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const request = await LeaveRequest.findById(requestId).populate("leaveType");
    if (!request) return res.status(404).json({ message: "Leave request not found" });
    if (request.status !== "pending") return res.status(400).json({ message: "Leave request already processed" });

    request.status = status;
    request.reviewedBy = req.user.id;
    await request.save();

    if (status === "approved") {
  const start = new Date(request.startDate);
  const end = new Date(request.endDate);
  let validDays = 0;

  for (
    let date = new Date(start);
    date <= end;
    date.setDate(date.getDate() + 1)
  ) {
    const current = new Date(date); // Avoid mutation
    const day = current.getDay();

    // Skip Sundays
    if (day === 0) continue;

    // Check for 2nd Saturday
    if (day === 6) {
      const month = current.getMonth();
      const year = current.getFullYear();

      // Count Saturdays in the current month
      let saturdayCount = 0;
      for (let d = 1; d <= current.getDate(); d++) {
        const temp = new Date(year, month, d);
        if (temp.getDay() === 6) {
          saturdayCount++;
        }
      }

      if (saturdayCount === 2) {
        // It's the 2nd Saturday
        continue;
      }
    }

    // Count as a valid leave day
    validDays++;
  }

  if (validDays > 0) {
    await LeaveBalance.findOneAndUpdate(
      { employee: request.employee, leaveType: request.leaveType._id },
      { $inc: { remainingDays: -validDays } }
    );
  }
}


    res.json({ message: `Leave request ${status} successfully`, request });
  } catch (err) {
    res.status(500).json({ message: "Error processing leave request", error: err.message });
  }
};

// DELETE /api/leaves/:id
export const deleteLeaveRequest = async (req, res) => {
  try {
    const request = await LeaveRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Leave request not found" });

    if (request.employee.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (request.status !== "pending") {
      return res.status(400).json({ message: "Only pending requests can be deleted" });
    }

    await LeaveRequest.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Leave request deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting leave request", error: err.message });
  }
};

// ADMIN: view all employees' leave balances
export const getAllLeaveBalances = async (req, res) => {
  try {
    const balances = await LeaveBalance
      .find()
      .populate("employee", "name email") 
      .populate("leaveType", "name advanceNoticeDays autoApproval");

    const employeeBalances = {};

    balances.forEach(balance => {
      // Skip if employee or leaveType is missing
      if (!balance.employee || !balance.leaveType) {
        console.warn("Skipping invalid LeaveBalance:", balance._id);
        return;
      }

      const empId = balance.employee._id.toString();
      const used = balance.totalDays - balance.remainingDays;

      // Initialize employee entry
      if (!employeeBalances[empId]) {
        employeeBalances[empId] = {
          employee: {
            id: empId,
            name: balance.employee.name,
            email: balance.employee.email
          },
          totalRemaining: 0,
          totalUsed: 0,
          leaveDetails: {}
        };
      }

      // Add balance data
      employeeBalances[empId].totalRemaining += balance.remainingDays;
      employeeBalances[empId].totalUsed += used;

      employeeBalances[empId].leaveDetails[balance.leaveType.name] = {
        leaveType: balance.leaveType.name,
        advanceNoticeDays: balance.leaveType.advanceNoticeDays,
        autoApproval: balance.leaveType.autoApproval,
        totalDays: balance.totalDays,
        usedDays: used,
        remainingDays: balance.remainingDays
      };
    });

    // Convert to array and return
    res.json(Object.values(employeeBalances));
  } catch (err) {
    res.status(500).json({ message: "Error fetching all balances", error: err.message });
  }
};

