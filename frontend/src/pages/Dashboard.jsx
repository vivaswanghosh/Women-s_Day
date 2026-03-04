import React, { useState, useRef } from 'react';
import { productAPI } from '../utils/api';
import { FiUpload, FiImage } from 'react-icons/fi';

const Dashboard = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    cost: '',
    hourSpent: '',
    category: '',
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      alert('Please upload an image');
      return;
    }

    setLoading(true);
    const uploadData = new FormData();
    Object.keys(formData).forEach((key) => {
      uploadData.append(key, formData[key]);
    });
    uploadData.append('image', image);

    try {
      const response = await productAPI.uploadProduct(uploadData);
      setResult(response.data);
      setFormData({ name: '', description: '', cost: '', hourSpent: '', category: '' });
      setImage(null);
      setPreview(null);
    } catch (error) {
      alert('Upload failed: ' + error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Upload Your Product</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-3">Product Image (Required)</label>
              <div
                onClick={() => fileInputRef.current.click()}
                className="border-2 border-dashed border-purple-300 rounded-lg p-8 text-center cursor-pointer hover:border-purple-500 transition"
              >
                {preview ? (
                  <img src={preview} alt="Preview" className="w-full h-48 object-cover rounded" />
                ) : (
                  <div>
                    <FiImage className="mx-auto text-gray-400 mb-2" size={40} />
                    <p className="text-gray-600">Click to upload image</p>
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Hand-stitched Floral Embroidery"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your product..."
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Material Cost (₹)</label>
                  <input
                    type="number"
                    name="cost"
                    value={formData.cost}
                    onChange={handleChange}
                    placeholder="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Hours Spent</label>
                  <input
                    type="number"
                    name="hourSpent"
                    value={formData.hourSpent}
                    onChange={handleChange}
                    placeholder="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select category</option>
                  <option value="embroidery">Embroidery</option>
                  <option value="crochet">Crochet</option>
                  <option value="jewelry">Jewelry</option>
                  <option value="diy">DIY Crafts</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 transition flex items-center justify-center gap-2"
              >
                <FiUpload /> {loading ? 'Analyzing...' : 'Get Smart Pricing'}
              </button>
            </div>
          </form>

          {/* Results */}
          {result && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Pricing Analysis</h2>

              <div className="space-y-6">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">Market Analysis</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Min Price:</span>
                      <span className="font-bold">₹{result.pricing.minPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Max Price:</span>
                      <span className="font-bold">₹{result.pricing.maxPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Median Price:</span>
                      <span className="font-bold">₹{result.product.marketMedianPrice}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border-2 border-green-200">
                  <h3 className="text-lg font-semibold text-green-700 mb-3">🎯 AI Suggested Price</h3>
                  <div className="text-4xl font-bold text-green-600 mb-2">₹{result.pricing.suggestedPrice}</div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Confidence Score:</span>
                    <span className="font-semibold">{result.pricing.confidenceScore}%</span>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-700 mb-2">Similar Products Found</h3>
                  <p className="text-gray-600 text-sm">{result.similarProducts.length} similar items analyzed</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
