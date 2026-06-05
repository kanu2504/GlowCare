const Product = require('../models/Product');

// GET all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ updatedAt: -1 });
    res.status(200).json({
      success: true,
      products,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message
    });
  }
};

// GET single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      product,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
      error: error.message
    });
  }
};

// Create new product
const createProduct = async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,
      price: Number(req.body.price),
      stock: Number(req.body.stock || 20),
      rating: Number(req.body.rating || 4.6),
    });
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create product",
      error: error.message
    });
  }
};

// Update product by ID
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        price: Number(req.body.price),
        rating: Number(req.body.rating),
        stock: Number(req.body.stock)
      },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      product: updatedProduct
    });
  } catch (error) {
    console.error("Product update failed:", error);
    res.status(500).json({
      success: false,
      message: "Product update failed",
      error: error.message
    });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      product,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete product",
      error: error.message
    });
  }
};

const getAdminProducts = getAllProducts;

module.exports = {
  getAllProducts,
  getProductById,
  getAdminProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
