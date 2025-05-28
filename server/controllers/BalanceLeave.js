import LeaveRequest from '../models/leaveRequest.js';
import BalanceSheet from '../models/balanceSheet.js';

// ADMIN: view all employees' leave balances (combined)
export const getAllBalanceLeaves = 
async (req, res) => {
  try {
    const balances = await LeaveBalance
      .find()
      .populate("employee", "name email") // Adjust fields as needed
      .populate("leaveType", "name advanceNoticeDays autoApproval");

    const employeeBalances = {};

    balances.forEach(balance => {
      const empId = balance.employee._id.toString();
      const used = balance.totalDays - balance.remainingDays;

      if (!employeeBalances[empId]) {
        employeeBalances[empId] = {
          employee: {
            id: empId,
            name: balance.employee.name,
            email: balance.employee.email,
          },
          totalRemaining: 0,
          totalUsed: 0,
          leaveDetails: {}
        };
      }

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

    res.json(Object.values(employeeBalances));
  } catch (err) {
    res.status(500).json({ message: "Error fetching all balances", error: err.message });
  }
};
