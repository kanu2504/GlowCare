const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  customerLogin,
  adminLogin,
  getMe,
  getProfile,
  updateProfile,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/customer-login', customerLogin);
router.post('/admin-login', adminLogin);
router.get('/me', protect, getMe);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

module.exports = router;
