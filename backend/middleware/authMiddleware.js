const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const env = require('../config/env');

/**
 * Middleware to verify that the request is authenticated with a valid JWT.
 */
const protect = (req, res, next) => {
  let token;

  // Retrieve token from Authorization header or cookies
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return next(new AppError('You are not logged in. Please log in to gain access.', 401));
  }

  try {
    const decoded = jwt.verify(token, env.jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    return next(new AppError('Invalid token or token has expired.', 401));
  }
};

/**
 * Middleware to verify the user role is admin.
 */
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return next(new AppError('Access denied. Admin authorization required.', 403));
  }
};

module.exports = {
  protect,
  admin,
  verifyToken: protect,
  verifyAdmin: admin
};
