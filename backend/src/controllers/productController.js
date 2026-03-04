const Product = require('../models/Product');
const MarketDataset = require('../models/MarketDataset');

// Calculate cosine similarity
const cosineSimilarity = (vecA, vecB) => {
  if (!vecA || !vecB || vecA.length === 0 || vecB.length === 0) return 0;
  
  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    magnitudeA += vecA[i] * vecA[i];
    magnitudeB += vecB[i] * vecB[i];
  }

  const denominator = Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB);
  return denominator === 0 ? 0 : dotProduct / denominator;
};

// Calculate smart pricing
const calculateSmartPrice = (similarProducts) => {
  if (!similarProducts || similarProducts.length === 0) {
    return { minPrice: 0, maxPrice: 0, suggestedPrice: 0, confidenceScore: 0 };
  }

  const prices = similarProducts.map((p) => p.price).sort((a, b) => a - b);

  // Remove outliers (bottom 10% and top 10%)
  const startIdx = Math.ceil(prices.length * 0.1);
  const endIdx = Math.floor(prices.length * 0.9);
  const filteredPrices = prices.slice(startIdx, endIdx);

  const minPrice = filteredPrices[0] || prices[0];
  const maxPrice = filteredPrices[filteredPrices.length - 1] || prices[prices.length - 1];

  // Weighted average based on similarity scores
  let weightedSum = 0;
  let totalWeight = 0;

  similarProducts.forEach((p, idx) => {
    const weight = Math.max(0, p.similarity);
    weightedSum += p.price * weight;
    totalWeight += weight;
  });

  const suggestedPrice = totalWeight > 0 ? weightedSum / totalWeight : (minPrice + maxPrice) / 2;
  const confidenceScore = Math.min(100, similarProducts.length * 8);

  return {
    minPrice: Math.round(minPrice),
    maxPrice: Math.round(maxPrice),
    suggestedPrice: Math.round(suggestedPrice),
    confidenceScore: Math.round(confidenceScore),
  };
};

// Upload Product with Image
exports.uploadProduct = async (req, res) => {
  try {
    const { name, description, cost, hourSpent, category } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

    if (!imageUrl) {
      return res.status(400).json({ message: 'Image is required' });
    }

    // Create embedding (mock for now - replace with actual AI model)
    const embedding = Array(512)
      .fill(0)
      .map(() => Math.random() - 0.5);

    // Find similar products
    const marketProducts = await MarketDataset.find().lean();

    const similarProducts = marketProducts
      .map((p) => ({
        ...p,
        similarity: cosineSimilarity(embedding, p.embedding),
      }))
      .filter((p) => p.similarity > 0.5)
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 20);

    // Calculate pricing
    const pricing = calculateSmartPrice(similarProducts);

    const product = new Product({
      userId: req.userId,
      name,
      description,
      imageUrl,
      embeddingVector: embedding,
      cost: parseFloat(cost) || 0,
      hourSpent: parseFloat(hourSpent) || 0,
      suggestedPrice: pricing.suggestedPrice,
      finalPrice: pricing.suggestedPrice,
      marketMinPrice: pricing.minPrice,
      marketMaxPrice: pricing.maxPrice,
      marketMedianPrice: Math.round((pricing.minPrice + pricing.maxPrice) / 2),
      confidenceScore: pricing.confidenceScore,
      category,
    });

    await product.save();

    res.json({
      product,
      similarProducts: similarProducts.slice(0, 5),
      pricing,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get User Products
exports.getUserProducts = async (req, res) => {
  try {
    const products = await Product.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Product Details
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Product Price
exports.updateProductPrice = async (req, res) => {
  try {
    const { finalPrice } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        finalPrice,
        lastModified: new Date(),
      },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
