const Product = require('../models/Product');

/**
 * Retrieves all products from the database sorted by creation date descending.
 */
const getAllProducts = async () => {
  return await Product.find().sort({ createdAt: -1 });
};

/**
 * Retrieves a single product by its database ID.
 */
const getProductById = async (id) => {
  return await Product.findById(id);
};

/**
 * Creates a new product.
 */
const createProduct = async (productData) => {
  return await Product.create(productData);
};

/**
 * Updates a product by its database ID.
 */
const updateProduct = async (id, productData) => {
  return await Product.findByIdAndUpdate(id, productData, {
    new: true,
    runValidators: true,
  });
};

/**
 * Deletes a product by its database ID.
 */
const deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
