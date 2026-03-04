import React, { useState, useEffect } from 'react';
import { pricingAPI } from '../utils/api';
import { FiBarChart2, FiTrendingUp, FiDollarSign, FiBox } from 'react-icons/fi';

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await pricingAPI.getPriceAnalytics();
      setAnalytics(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading analytics...</div>;
  }

  if (!analytics) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-600">No analytics data available yet.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Business Analytics</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Total Products</p>
                <p className="text-3xl font-bold text-gray-900">{analytics.totalProducts}</p>
              </div>
              <FiBox className="text-purple-500" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Average Price</p>
                <p className="text-3xl font-bold text-green-600">₹{analytics.averagePrice}</p>
              </div>
              <FiDollarSign className="text-green-500" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Avg Profit Margin</p>
                <p className="text-3xl font-bold text-blue-600">{analytics.averageProfitMargin}%</p>
              </div>
              <FiTrendingUp className="text-blue-500" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Total Profit</p>
                <p className="text-3xl font-bold text-orange-600">₹{analytics.totalProfit}</p>
              </div>
              <FiBarChart2 className="text-orange-500" size={40} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Price Range Analysis</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-700 font-semibold">Minimum Price</span>
                <span className="text-lg font-bold text-red-600">₹{analytics.priceRange.min}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-700 font-semibold">Maximum Price</span>
                <span className="text-lg font-bold text-green-600">₹{analytics.priceRange.max}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-700">
                💡 <strong>Insight:</strong> Your products are priced between ₹{analytics.priceRange.min} and ₹
                {analytics.priceRange.max}. Average selling price is ₹{analytics.averagePrice} with an average profit
                margin of {analytics.averageProfitMargin}%.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
