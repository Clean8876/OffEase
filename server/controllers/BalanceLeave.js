import LeaveRequest from '../models/leaveRequest.js';
import BalanceSheet from '../models/balanceSheet.js';

export const getAllBalanceLeaves = async (req, res) => {
  try {
    const balances = await BalanceSheet.find().populate({
      path: 'employee',
      select: 'Firstname Lastname email department role'
    });

    console.log('Fetched Balances:', balances);

    if (!balances.length) {
      return res.status(404).json({ message: 'No balance sheet records found' });
    }

    const result = await Promise.all(
      balances.map(async (balance) => {
        const approvedLeaves = await LeaveRequest.find({
          employee: balance.employee._id,
          status: 'approved'
        }).populate('leaveType');

        console.log(`Approved leaves for ${balance.employee.Firstname}:`, approvedLeaves);

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

        return {
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
      })
    );

    // Wrap the result inside an object with key 'data'
    res.status(200).json({ data: result });
  } catch (error) {
    console.error('Error getting balance leaves:', error);
    res.status(500).json({ message: 'Failed to fetch balance leaves' });
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