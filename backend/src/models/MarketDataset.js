const mongoose = require('mongoose');

const marketDatasetSchema = new mongoose.Schema(
  {
    externalId: String,
    name: String,
    imageUrl: String,
    embedding: [Number],
    price: Number,
    category: String,
    source: {
      type: String,
      enum: ['etsy', 'meesho', 'amazon', 'other'],
      default: 'other',
    },
    popularity: Number,
    trend: String,
    color: String,
    material: String,
    views: {
      type: Number,
      default: 0,
    },
    sales: {
      type: Number,
      default: 0,
    },
    rating: Number,
    reviews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('MarketDataset', marketDatasetSchema);
