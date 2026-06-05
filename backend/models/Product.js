const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a product name'],
      trim: true,
    },
    imageUrl: {
      type: String,
    },
    image: {
      type: String,
    },
    price: {
      type: Number,
      required: [true, 'Please add a product price'],
      min: [0, 'Price must be positive'],
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
    },
    shortDescription: {
      type: String,
      required: [true, 'Please add a short description'],
    },
    description: {
      type: String,
    },
    fullDescription: {
      type: String,
    },
    rating: {
      type: Number,
      default: 4.6,
    },
    stock: {
      type: Number,
      default: 20,
    },
    benefits: {
      type: [String],
      default: [],
    }
  },
  {
    timestamps: true,
  }
);

// Pre-save to synchronize image/imageUrl and description/fullDescription
productSchema.pre('save', function(next) {
  if (this.image && !this.imageUrl) this.imageUrl = this.image;
  if (this.imageUrl && !this.image) this.image = this.imageUrl;
  if (this.description && !this.fullDescription) this.fullDescription = this.description;
  if (this.fullDescription && !this.description) this.description = this.fullDescription;
  next();
});

module.exports = mongoose.model('Product', productSchema);
