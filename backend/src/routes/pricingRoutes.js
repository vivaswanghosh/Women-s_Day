const express = require('express');
const pricingController = require('../controllers/pricingController');

const router = express.Router();

// Middleware to verify JWT
const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = require('jsonwebtoken').verify(token, process.env.JWT_SECRET || 'secret');
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

router.get('/profit/:productId', auth, pricingController.calculateProfit);
router.get('/fairness/:productId', auth, pricingController.getPriceFairness);
router.get('/analytics', auth, pricingController.getPriceAnalytics);

module.exports = router;
