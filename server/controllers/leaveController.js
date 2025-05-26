import LeaveType    from "../models/leaveType.js";
import LeaveBalance from "../models/leaveBalance.js";
import LeaveRequest from "../models/leaveRequest.js";

// ADMIN: initialize balances for a new employee
export const initLeaveBalances = async (req, res) => {
  try {
    const { employeeId, quotas } = req.body;
    // quotas = [{ leaveTypeName: 'casual', totalDays: 12 }, ...]

    // fetch types
    const types = await LeaveType.find({
      name: { $in: quotas.map(q => q.leaveTypeName) }
    });

    const ops = quotas.map(q => {
      const lt = types.find(t => t.name === q.leaveTypeName);
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
    });

    await LeaveBalance.bulkWrite(ops);
    res.status(200).json({ message: "Leave balances initialized" });
  } catch (err) {
    res.status(500).json({ message: "Error initializing balances", error: err.message });
  }
};

// EMPLOYEE: view own balances
export const getMyLeaveBalances = async (req, res) => {
  try {
    const balances = await LeaveBalance
      .find({ employee: req.user.id })
      .populate("leaveType", "name advanceNoticeDays autoApproval");
    res.json(balances);
  } catch (err) {
    res.status(500).json({ message: "Error fetching balances", error: err.message });
  }
};

// EMPLOYEE: submit a leave request
export const submitLeaveRequest = async (req, res) => {
  try {
    const { leaveTypeId, startDate, endDate, reason ,description} = req.body;

    const leaveType = await LeaveType.findById(leaveTypeId);
    if (!leaveType) return res.status(400).json({ message: "Invalid leaveTypeId" });

    const now = new Date();
    const start = new Date(startDate);
    const daysNotice = Math.ceil((start - now) / (1000 * 60 * 60 * 24));

    if (daysNotice < leaveType.advanceNoticeDays) {
      return res.status(400).json({
        message: `Must apply ${leaveType.advanceNoticeDays} days in advance for ${leaveType.name}`,
      });
    }

    // Calculate number of leave days
    const requestedDays = Math.ceil(
      (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
    ) + 1;

    // Check leave balance
    const balance = await LeaveBalance.findOne({
      employee: req.user.id,
      leaveType: leaveTypeId,
    });

    if (!balance || balance.remainingDays < requestedDays) {
      return res.status(400).json({
        message: `Insufficient ${leaveType.name} leave balance. Available: ${balance ? balance.remainingDays : 0}, Requested: ${requestedDays}`,
      });
    }

    // Determine status
    const status = leaveType.autoApproval ? "approved" : "pending";

    // Create the request
    const reqDoc = await LeaveRequest.create({
      employee: req.user.id,
      leaveType: leaveTypeId,
      startDate,
      endDate,
      reason,
      status,
      description
    });

    // If auto-approved, deduct immediately
    if (status === "approved") {
      await LeaveBalance.findOneAndUpdate(
        { employee: req.user.id, leaveType: leaveTypeId },
        { $inc: { remainingDays: -requestedDays } }
      );
    }

    res.status(201).json(reqDoc);
  } catch (err) {
    console.error("Leave request error:", err.message);
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

// ADMIN: approve or reject a request
export const  getLeaveRequestsWithBalances = async (req, res) => {
  try {
    // Get status from query params, default to 'pending'
    const { status = 'pending' } = req.query;

    // Validate status
    const validStatuses = ['pending', 'approved', 'rejected', 'all'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status filter' });
    }

    // Build query condition
    const condition = status === 'all' ? {} : { status };

    // Fetch leave requests based on filter
    const leaveRequests = await LeaveRequest.find(condition)
      .populate('employee', 'Firstname Lastname email department')
      .populate('leaveType', 'name')
      .sort({ createdAt: -1 });

    // Fetch all leave balances
    const balances = await LeaveBalance.find()
      .populate('leaveType', 'name')
      .populate('employee', '_id');

    // Map: employeeId -> { casual: { total, remaining }, sick: { total, remaining } }
    const balanceMap = {};
    for (const balance of balances) {
      const empId = balance.employee._id.toString();
      if (!balanceMap[empId]) balanceMap[empId] = {};
      balanceMap[empId][balance.leaveType.name] = {
        total: balance.totalDays,
        remaining: balance.remainingDays,
      };
    }

    // Attach leave balances to each request
    const enrichedRequests = leaveRequests.map(req => {
      const empId = req.employee._id.toString();
      return {
        ...req._doc,
        leaveBalances: balanceMap[empId] || {},
      };
    });

    res.status(200).json(enrichedRequests);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve leave requests with balances', error: err.message });
  }
};

// PATCH /api/leave/requests/status
export const updateLeaveRequestStatus = async (req, res) => {
  const { requestId, status } = req.body;

  if (!["approved", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  const request = await LeaveRequest.findById(requestId).populate("leaveType");
  if (!request) return res.status(404).json({ message: "Leave request not found" });

  if (request.status !== "pending") {
    return res.status(400).json({ message: "Leave request already processed" });
  }

  request.status = status;
  request.reviewedBy = req.user.id;
  await request.save();

  if (status === "approved") {
    const leaveDays = (new Date(request.endDate) - new Date(request.startDate)) / (1000 * 60 * 60 * 24) + 1;
    await LeaveBalance.findOneAndUpdate(
      { employee: request.employee, leaveType: request.leaveType._id },
      { $inc: { remainingDays: -leaveDays } }
    );
  }

  res.json({ message: `Leave request ${status} successfully`, request });
};

// DELETE /api/leaves/:id
export const deleteLeaveRequest = async (req, res) => {
  try {
    const leaveRequestId = req.params.id;

    const request = await LeaveRequest.findById(leaveRequestId);

    if (!request) {
      return res.status(404).json({ message: "Leave request not found" });
    }

    // Ensure the requester owns the leave or is an admin
    if (request.employee.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "You are not authorized to delete this request" });
    }

    // Only pending requests can be deleted
    if (request.status !== "pending") {
      return res.status(400).json({ message: "Only pending requests can be deleted" });
    }

    await LeaveRequest.findByIdAndDelete(leaveRequestId);

    res.status(200).json({ message: "Leave request deleted successfully" });
  } catch (err) {
    console.error("Error deleting leave request:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
