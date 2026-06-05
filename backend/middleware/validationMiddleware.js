const AppError = require('../utils/AppError');

/**
 * Validates request body for submitting a customer enquiry.
 */
const validateEnquiry = (req, res, next) => {
  if (req.body.fullName && !req.body.name) req.body.name = req.body.fullName;
  if (req.body.productInterest && !req.body.product) req.body.product = req.body.productInterest;
  if (req.body.specialInstructions && !req.body.message) req.body.message = req.body.specialInstructions;

  const { name, phone, email, product, message } = req.body;

  if (!name || !name.trim()) {
    return next(new AppError('Name is required', 400));
  }

  if (!phone || !phone.trim()) {
    return next(new AppError('Phone number is required', 400));
  }

  if (!email || !email.trim()) {
    return next(new AppError('Email Address is required', 400));
  }
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(email)) {
    return next(new AppError('Please provide a valid email address', 400));
  }

  if (!product || !product.trim()) {
    return next(new AppError('Product interest is required', 400));
  }

  next();
};

/**
 * Validates request body for creating or updating a product.
 */
const validateProduct = (req, res, next) => {
  const { name, imageUrl, price, category, shortDescription, fullDescription } = req.body;

  if (!name || !name.trim()) {
    return next(new AppError('Product name is required', 400));
  }

  if (!imageUrl || !imageUrl.trim()) {
    return next(new AppError('Product image URL is required', 400));
  }

  if (price === undefined || price === null) {
    return next(new AppError('Product price is required', 400));
  }
  const parsedPrice = Number(price);
  if (isNaN(parsedPrice) || parsedPrice < 0) {
    return next(new AppError('Price must be a positive number', 400));
  }

  if (!category || !category.trim()) {
    return next(new AppError('Product category is required', 400));
  }

  if (!shortDescription || !shortDescription.trim()) {
    return next(new AppError('Short description is required', 400));
  }

  if (!fullDescription || !fullDescription.trim()) {
    return next(new AppError('Product full description is required', 400));
  }

  next();
};

module.exports = {
  validateEnquiry,
  validateProduct
};
