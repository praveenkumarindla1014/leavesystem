const express = require('express');
const { applyLeave, getLeaves, updateLeaveStatus } = require('../controllers/leaveController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// POST /api/leaves – Apply for leave (Employee only)
router.post('/', protect, authorize('employee'), applyLeave);

// GET /api/leaves – Get leaves (scoped by role)
router.get('/', protect, getLeaves);

// PUT /api/leaves/:id/status – Approve or Reject (Employer only)
router.put('/:id/status', protect, authorize('employer'), updateLeaveStatus);

module.exports = router;
