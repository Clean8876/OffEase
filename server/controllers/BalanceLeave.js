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
