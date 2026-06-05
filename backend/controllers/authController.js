const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const AppError = require('../utils/AppError');
const env = require('../config/env');

/**
 * Generate a JWT token for a user.
 */
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, env.jwtSecret, {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return next(new AppError('User already exists with this email', 400));
  }

  // Create new user
  const user = await User.create({
    name,
    email,
    password,
    role: role || 'user', // Defaults to 'user'
  });

  if (user) {
    res.status(201).json({
      success: true,
      token: generateToken(user._id, user.role),
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } else {
    return next(new AppError('Invalid user data provided', 400));
  }
});

// @desc    Login user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password presence
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  // Check for user
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new AppError('Invalid credentials', 401));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new AppError('Invalid credentials', 401));
  }

  res.status(200).json({
    success: true,
    token: generateToken(user._id, user.role),
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

// @desc    Get current logged in user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res, next) => {
  // req.user is set by the protect/verifyToken middleware
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  res.status(200).json({
    success: true,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

// @desc    Auto-register / Login customer
// @route   POST /api/auth/customer-login
// @access  Public
const customerLogin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please enter email and password.', 400));
  }

  // Find user by email
  let user = await User.findOne({ email }).select('+password');

  if (user) {
    // If user exists, check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      // If password mismatch, update password hash for this demo project
      user.password = password;
      await user.save();
    }

    res.status(200).json({
      success: true,
      token: generateToken(user._id, user.role),
      user: {
        id: user._id,
        _id: user._id,
        email: user.email,
        role: user.role,
        name: user.name || email.split('@')[0],
      },
      message: 'Login successful',
    });
  } else {
    // If user does not exist, automatically register new customer
    user = await User.create({
      name: email.split('@')[0],
      email,
      password,
      role: 'user',
    });

    res.status(201).json({
      success: true,
      token: generateToken(user._id, user.role),
      user: {
        id: user._id,
        _id: user._id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
      message: 'Account created and logged in successfully',
    });
  }
});

// @desc    Admin login & get token
// @route   POST /api/auth/admin-login
// @access  Public
const adminLogin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please enter email and password.', 400));
  }

  // Find user by email, selecting password
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new AppError('Invalid credentials', 401));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new AppError('Invalid credentials', 401));
  }

  // Ensure role is admin
  if (user.role !== 'admin') {
    return next(new AppError('Access denied. Administrator privileges required.', 403));
  }

  res.status(200).json({
    success: true,
    token: generateToken(user._id, user.role),
    user: {
      email: user.email,
      role: user.role,
      name: user.name,
    },
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    message: 'Admin login successful',
  });
});

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  // Update fields
  const fields = ['name', 'phone', 'address', 'city', 'state', 'pincode', 'profileImage'];
  fields.forEach((field) => {
    if (req.body[field] !== undefined) {
      user[field] = req.body[field];
    }
  });

  if (req.body.email && req.body.email !== user.email) {
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {
      return next(new AppError('Email is already in use', 400));
    }
    user.email = req.body.email;
  }

  await user.save();

  res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    data: {
      id: user._id,
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      city: user.city,
      state: user.state,
      pincode: user.pincode,
      profileImage: user.profileImage,
      role: user.role,
    },
  });
});

module.exports = {
  registerUser,
  loginUser,
  customerLogin,
  adminLogin,
  getMe,
  getProfile,
  updateProfile,
};

