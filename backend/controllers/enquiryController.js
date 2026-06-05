const asyncHandler = require('express-async-handler');
const enquiryService = require('../services/enquiryService');
const AppError = require('../utils/AppError');

// @desc    Create new enquiry
// @route   POST /api/enquiries
// @access  Public
const createEnquiry = asyncHandler(async (req, res, next) => {
  const enquiry = await enquiryService.createEnquiry(req.body);

  res.status(201).json({
    success: true,
    message: 'Enquiry submitted successfully',
    data: enquiry,
  });
});

// @desc    Get all enquiries
// @route   GET /api/enquiries
// @access  Public
const getAllEnquiries = asyncHandler(async (req, res, next) => {
  const enquiries = await enquiryService.getAllEnquiries();

  res.status(200).json({
    success: true,
    count: enquiries.length,
    data: enquiries,
  });
});

// @desc    Get single enquiry by ID
// @route   GET /api/enquiries/:id
// @access  Public
const getEnquiryById = asyncHandler(async (req, res, next) => {
  const enquiry = await enquiryService.getEnquiryById(req.params.id);

  if (!enquiry) {
    return next(new AppError('Enquiry not found', 404));
  }

  res.status(200).json({
    success: true,
    data: enquiry,
  });
});

// @desc    Update enquiry status
// @route   PUT /api/enquiries/:id/status
// @access  Public
const updateEnquiryStatus = asyncHandler(async (req, res, next) => {
  const { status } = req.body;

  if (!status) {
    return next(new AppError('Please provide a status', 400));
  }

  if (!['New', 'Contacted', 'Closed'].includes(status)) {
    return next(new AppError('Invalid status', 400));
  }

  const enquiry = await enquiryService.updateEnquiryStatus(req.params.id, status);

  if (!enquiry) {
    return next(new AppError('Enquiry not found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Status updated successfully',
    data: enquiry,
  });
});

// @desc    Delete enquiry
// @route   DELETE /api/enquiries/:id
// @access  Public
const deleteEnquiry = asyncHandler(async (req, res, next) => {
  const enquiry = await enquiryService.deleteEnquiry(req.params.id);

  if (!enquiry) {
    return next(new AppError('Enquiry not found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Enquiry deleted successfully',
    data: enquiry,
  });
});

module.exports = {
  createEnquiry,
  getAllEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  deleteEnquiry,
};
