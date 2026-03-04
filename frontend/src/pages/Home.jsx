import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../utils/AuthContext';
import { FiImage, FiBarChart2, FiDollarSign, FiTrendingUp, FiUsers, FiArrowRight } from 'react-icons/fi';

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Turn Your Craft Into Smart Business Decisions</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            CraftLens AI uses computer vision and smart pricing analytics to help handmade creators price products
            intelligently.
          </p>
          {!isAuthenticated && (
            <Link
              to="/register"
              className="inline-flex items-center gap-2 bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Get Started Free <FiArrowRight />
            </Link>
          )}
          {isAuthenticated && (
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Go to Dashboard <FiArrowRight />
            </Link>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Step 1 */}
            <div className="bg-white rounded-lg p-8 shadow-lg text-center hover:shadow-xl transition">
              <div className="inline-block bg-purple-100 text-purple-600 rounded-full p-4 mb-4">
                <FiImage size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">1. Upload Image</h3>
              <p className="text-gray-600">Take a picture of your handmade product</p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-lg p-8 shadow-lg text-center hover:shadow-xl transition">
              <div className="inline-block bg-blue-100 text-blue-600 rounded-full p-4 mb-4">
                <FiTrendingUp size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">2. AI Analysis</h3>
              <p className="text-gray-600">Our AI finds visually similar products</p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-lg p-8 shadow-lg text-center hover:shadow-xl transition">
              <div className="inline-block bg-green-100 text-green-600 rounded-full p-4 mb-4">
                <FiDollarSign size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">3. Price Suggestion</h3>
              <p className="text-gray-600">Get data-backed pricing recommendations</p>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-lg p-8 shadow-lg text-center hover:shadow-xl transition">
              <div className="inline-block bg-yellow-100 text-yellow-600 rounded-full p-4 mb-4">
                <FiBarChart2 size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">4. Analytics</h3>
              <p className="text-gray-600">Track profit margins and trends</p>
            </div>

            {/* Step 5 */}
            <div className="bg-white rounded-lg p-8 shadow-lg text-center hover:shadow-xl transition">
              <div className="inline-block bg-pink-100 text-pink-600 rounded-full p-4 mb-4">
                <FiUsers size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">5. Scale</h3>
              <p className="text-gray-600">Grow your business with confidence</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Highlight */}
      <div className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Why Choose CraftLens AI?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="text-4xl">🎨</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Visual-First AI</h3>
                  <p className="text-gray-600">Upload images instead of keywords. AI understands visual similarity.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-4xl">⚖️</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Price Fairness Meter</h3>
                  <p className="text-gray-600">Know if you're underpriced, fair, or overpriced instantly.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-4xl">💰</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Profit Margin Calculator</h3>
                  <p className="text-gray-600">Calculate break-even points and ROI automatically.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-4xl">📈</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Trend Intelligence</h3>
                  <p className="text-gray-600">Detect trending patterns and seasonal demand spikes.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg p-8 flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-4">Special For Creators</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <span className="text-2xl">✓</span>
                  <span className="text-gray-700">Designed for embroidery artists & craft makers</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl">✓</span>
                  <span className="text-gray-700">Works for home-based micro businesses</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl">✓</span>
                  <span className="text-gray-700">Woman-entrepreneur friendly</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl">✓</span>
                  <span className="text-gray-700">No business degree required</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Simple Pricing</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition">
              <h3 className="text-2xl font-bold mb-2">Free</h3>
              <p className="text-gray-600 mb-6">Perfect for getting started</p>
              <div className="text-4xl font-bold mb-6">₹0</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>5 uploads/month</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Basic pricing</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Product management</span>
                </li>
              </ul>
              <button className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-300 transition">
                Get Started
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-lg shadow-lg p-8 hover:shadow-xl transition border-2 border-purple-700">
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <p className="mb-6 opacity-90">For serious sellers</p>
              <div className="text-4xl font-bold mb-6">₹299 <span className="text-sm">/month</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Unlimited uploads</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Advanced analytics</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Trend detection</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Priority support</span>
                </li>
              </ul>
              <button className="w-full bg-white text-purple-600 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
                Upgrade Now
              </button>
            </div>

            {/* Commission Model */}
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition">
              <h3 className="text-2xl font-bold mb-2">Commission</h3>
              <p className="text-gray-600 mb-6">Sell on our marketplace</p>
              <div className="text-4xl font-bold mb-6">
                5-10<span className="text-sm">%</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Marketplace access</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Built-in customers</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Payment handling</span>
                </li>
              </ul>
              <button className="w-full bg-gray-800 text-white py-2 rounded-lg font-semibold hover:bg-gray-900 transition">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Price Your Products Smart?</h2>
          <p className="text-xl mb-8">Join thousands of crafters making data-backed pricing decisions.</p>
          {!isAuthenticated && (
            <Link
              to="/register"
              className="inline-flex items-center gap-2 bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Start For Free <FiArrowRight />
            </Link>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="text-white font-bold mb-4">CraftLens AI</h4>
            <p className="text-sm">Smart pricing for handmade creators.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  How it Works
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-sm">
          <p>&copy; 2026 CraftLens AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
