const Product = require('../models/Product');

// Calculate profit margin
exports.calculateProfit = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const costPrice = product.cost;
    const sellingPrice = product.finalPrice;
    const hourSpent = product.hourSpent;

    const profit = sellingPrice - costPrice;
    const profitMargin = costPrice > 0 ? (profit / costPrice) * 100 : 0;
    const profitPerHour = hourSpent > 0 ? profit / hourSpent : profit;

    const breakEven = costPrice;
    const roiPercentage = costPrice > 0 ? ((sellingPrice - costPrice) / costPrice) * 100 : 0;

    res.json({
      costPrice,
      sellingPrice,
      profit: Math.round(profit),
      profitMargin: Math.round(profitMargin),
      profitPerHour: Math.round(profitPerHour),
      breakEven,
      roiPercentage: Math.round(roiPercentage),
      hourSpent,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get price fairness assessment
exports.getPriceFairness = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const median = product.marketMedianPrice || product.finalPrice;
    const finalPrice = product.finalPrice;

    let status = 'fair';
    let percentageFromMedian = 0;

    if (median > 0) {
      percentageFromMedian = ((finalPrice - median) / median) * 100;
      if (percentageFromMedian < -25) {
        status = 'underpriced';
      } else if (percentageFromMedian > 25) {
        status = 'overpriced';
      }
    }

    res.json({
      status,
      yourPrice: finalPrice,
      marketMedian: Math.round(median),
      marketMin: product.marketMinPrice,
      marketMax: product.marketMaxPrice,
      percentageFromMedian: Math.round(percentageFromMedian),
      confidenceScore: product.confidenceScore,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get price analytics
exports.getPriceAnalytics = async (req, res) => {
  try {
    const userId = req.userId;
    const products = await Product.find({ userId });

    const totalProducts = products.length;
    const averagePrice = products.reduce((sum, p) => sum + p.finalPrice, 0) / totalProducts || 0;
    const totalProfit = products.reduce((sum, p) => sum + (p.finalPrice - p.cost), 0);
    const averageProfitMargin =
      products.reduce((sum, p) => {
        const cost = p.cost || 1;
        return sum + ((p.finalPrice - cost) / cost) * 100;
      }, 0) / totalProducts || 0;

    const priceRange = {
      min: Math.min(...products.map((p) => p.finalPrice)),
      max: Math.max(...products.map((p) => p.finalPrice)),
    };

    res.json({
      totalProducts,
      averagePrice: Math.round(averagePrice),
      totalProfit: Math.round(totalProfit),
      averageProfitMargin: Math.round(averageProfitMargin),
      priceRange,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
