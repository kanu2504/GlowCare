const Enquiry = require('../models/Enquiry');

/**
 * Creates a new customer enquiry.
 */
const createEnquiry = async (enquiryData) => {
  return await Enquiry.create(enquiryData);
};

/**
 * Retrieves all customer enquiries sorted by creation date descending.
 */
const getAllEnquiries = async () => {
  return await Enquiry.find().sort({ createdAt: -1 });
};

/**
 * Retrieves a single enquiry by its database ID.
 */
const getEnquiryById = async (id) => {
  return await Enquiry.findById(id);
};

/**
 * Updates the status of an enquiry by its database ID.
 */
const updateEnquiryStatus = async (id, status) => {
  return await Enquiry.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true }
  );
};

/**
 * Deletes an enquiry by its database ID.
 */
const deleteEnquiry = async (id) => {
  return await Enquiry.findByIdAndDelete(id);
};

module.exports = {
  createEnquiry,
  getAllEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  deleteEnquiry,
};
