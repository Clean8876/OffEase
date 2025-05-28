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

export const getBalanceByEmployeeId = async (req, res) => {
  const { id } = req.params; // employee ID
 
  try {
    const balance = await BalanceSheet.findOne({ employee: id }).populate({
      path: 'employee',
      select: 'Firstname Lastname email department role'
    });
 
    if (!balance) {
      return res.status(404).json({ message: 'Balance sheet record not found for this employee' });
    }
 
    const approvedLeaves = await LeaveRequest.find({
      employee: id,
      status: 'approved'
    }).populate('leaveType');
 
    let sickTaken = 0;
    let casualTaken = 0;
 
    approvedLeaves.forEach((leave) => {
      const leaveDays = Math.ceil(
        (new Date(leave.endDate) - new Date(leave.startDate)) / (1000 * 60 * 60 * 24)
      ) + 1;
 
      const leaveTypeName = leave.leaveType?.name?.toLowerCase();
      if (leaveTypeName === 'sick') sickTaken += leaveDays;
      else if (leaveTypeName === 'casual') casualTaken += leaveDays;
    });
 
    const result = {
      employee: {
        id: balance.employee._id,
        name: `${balance.employee.Firstname} ${balance.employee.Lastname}`,
        email: balance.employee.email,
        department: balance.employee.department,
        role: balance.employee.role
      },
      totalLeaves: balance.totalLeaves,
      remainingLeaves: {
        sick: balance.sickLeaves - sickTaken,
        casual: balance.casualLeaves - casualTaken
      },
      totalRemainingLeaves: balance.totalLeaves - (sickTaken + casualTaken),
      overallRemainingLeaves: balance.totalLeaves - (sickTaken + casualTaken)
    };
 
    res.status(200).json({ data: result });
  } catch (error) {
    console.error('Error fetching balance for employee:', error);
    res.status(500).json({ message: 'Failed to fetch balance data for employee' });
  }
};

export const updateBalance = async (req, res) => 
    BalanceSheet.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
      .then((balance) => {
        if (!balance) {
          return res.status(404).json({ message: 'Balance not found' });
        }
        res.status(200).json(balance);
      })
      .catch((error) => {
        console.error('Error updating balance:', error);
        res.status(500).json({ message: 'Failed to update balance' });
      });