const LeaveRequest = require('../models/LeaveRequest');

// @desc    Apply for leave
// @route   POST /api/leaves
// @access  Employee only
const applyLeave = async (req, res) => {
  try {
    const { leaveType, startDate, endDate, reason } = req.body;

    // Manual validation
    if (!leaveType || !['Sick Leave', 'Casual Leave', 'Paid Time Off'].includes(leaveType)) {
      return res.status(400).json({ message: 'Invalid leave type. Must be Sick Leave, Casual Leave, or Paid Time Off' });
    }
    if (!startDate) {
      return res.status(400).json({ message: 'Start date is required' });
    }
    if (!endDate) {
      return res.status(400).json({ message: 'End date is required' });
    }
    if (new Date(startDate) > new Date(endDate)) {
      return res.status(400).json({ message: 'Start date cannot be after end date' });
    }
    if (!reason || !reason.trim()) {
      return res.status(400).json({ message: 'Reason is required' });
    }

    const leave = await LeaveRequest.create({
      employeeId: req.user._id,
      leaveType,
      startDate,
      endDate,
      reason,
    });

    res.status(201).json(leave);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get leave requests
// @route   GET /api/leaves
// @access  Employee (own leaves) / Employer (all leaves)
const getLeaves = async (req, res) => {
  try {
    let leaves;

    if (req.user.role === 'employer') {
      leaves = await LeaveRequest.find()
        .populate('employeeId', 'name email')
        .sort({ createdAt: -1 });
    } else {
      leaves = await LeaveRequest.find({ employeeId: req.user._id })
        .sort({ createdAt: -1 });
    }

    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update leave status (approve/reject)
// @route   PUT /api/leaves/:id/status
// @access  Employer only
const updateLeaveStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!['Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: 'Status must be either Approved or Rejected' });
    }

    const leave = await LeaveRequest.findById(req.params.id);
    if (!leave) {
      return res.status(404).json({ message: 'Leave request not found' });
    }

    if (leave.status !== 'Pending') {
      return res.status(400).json({ message: 'This leave request has already been processed' });
    }

    leave.status = status;
    await leave.save();

    res.json(leave);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { applyLeave, getLeaves, updateLeaveStatus };
