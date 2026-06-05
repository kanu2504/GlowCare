const express = require('express');
const router = express.Router();
const {
  createEnquiry,
  getAllEnquiries,
  updateEnquiryStatus,
} = require('../controllers/enquiryController');
const { validateEnquiry } = require('../middleware/validationMiddleware');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

router.route('/')
  .post(validateEnquiry, createEnquiry)
  .get(verifyToken, verifyAdmin, getAllEnquiries);

router.route('/:id/status')
  .patch(verifyToken, verifyAdmin, updateEnquiryStatus);

module.exports = router;
