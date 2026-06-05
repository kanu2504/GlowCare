const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  getAdminProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

router.route('/')
  .get(getAllProducts)
  .post(verifyToken, verifyAdmin, createProduct);

router.route('/admin/all')
  .get(verifyToken, verifyAdmin, getAdminProducts);

router.route('/:id')
  .get(getProductById)
  .put(verifyToken, verifyAdmin, updateProduct)
  .delete(verifyToken, verifyAdmin, deleteProduct);

module.exports = router;
