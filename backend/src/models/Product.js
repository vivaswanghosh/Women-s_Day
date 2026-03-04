const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: String,
    description: String,
    imageUrl: {
      type: String,
      required: true,
    },
    embeddingVector: [Number],
    cost: {
      type: Number,
      default: 0,
    },
    hourSpent: {
      type: Number,
      default: 0,
    },
    suggestedPrice: Number,
    finalPrice: {
      type: Number,
      required: true,
    },
    marketMinPrice: Number,
    marketMaxPrice: Number,
    marketMedianPrice: Number,
    confidenceScore: Number,
    category: String,
    status: {
      type: String,
      enum: ['draft', 'active', 'sold'],
      default: 'active',
    },
    views: {
      type: Number,
      default: 0,
    },
    sales: {
      type: Number,
      default: 0,
    },
    lastModified: Date,
    priceHistory: [
      {
        price: Number,
        date: Date,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
