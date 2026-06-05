const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add your full name'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Please add your mobile number'],
    },
    email: {
      type: String,
      required: [true, 'Please add your email address'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email address',
      ],
    },
    product: {
      type: String,
      required: [true, 'Please select a product'],
    },
    message: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Closed'],
      default: 'New',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Enquiry', enquirySchema);
