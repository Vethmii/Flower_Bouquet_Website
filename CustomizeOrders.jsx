import React, { useState } from 'react';

const CustomizeOrders = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    contactNo: '',
    occasionType: '',
    preferredFlowers: '',
    wrappingStyle: '',
    deliveryDate: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save to localStorage
    const orders = JSON.parse(localStorage.getItem('nonimi_orders') || '[]');
    const newOrder = {
      ...formData,
      id: Date.now(),
      orderDate: new Date().toISOString(),
      status: 'Pending'
    };

    orders.push(newOrder);
    localStorage.setItem('nonimi_orders', JSON.stringify(orders));

    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        customerName: '',
        contactNo: '',
        occasionType: '',
        preferredFlowers: '',
        wrappingStyle: '',
        deliveryDate: ''
      });
    }, 3000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="text-center mb-12">
        <div className="relative h-80 rounded-lg overflow-hidden mb-6">
          <img
            src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=320&fit=crop"
            alt="Customize Your Order"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-white text-center">
              <h1 className="text-4xl font-bold mb-4">Customize Your Perfect Bouquet</h1>
              <p className="text-xl">Tell us your preferences and we'll create something special</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        {submitted ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <div className="text-green-600 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-green-800 mb-2">
              Order Submitted Successfully!
            </h2>
            <p className="text-green-700">
              Thank you for your custom order. We'll contact you soon to confirm the details.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Custom Order Form</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    name="contactNo"
                    value={formData.contactNo}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Occasion Type *
                </label>
                <select
                  name="occasionType"
                  value={formData.occasionType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                >
                  <option value="">Select an occasion</option>
                  <option value="Birthdays">Birthdays</option>
                  <option value="Graduations">Graduations</option>
                  <option value="Valentine">Valentine</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Flowers/Colors
                </label>
                <textarea
                  name="preferredFlowers"
                  value={formData.preferredFlowers}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Describe your preferred flowers, colors, or any specific requests..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Wrapping Style</label>
                <select
                  name="wrappingStyle"
                  value={formData.wrappingStyle}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="">Select wrapping style</option>
                  <option value="Classic Paper">Classic Paper</option>
                  <option value="Cellophane">Cellophane</option>
                  <option value="Burlap">Burlap</option>
                  <option value="Basket">Basket</option>
                  <option value="Box">Box</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Date *
                </label>
                <input
                  type="date"
                  name="deliveryDate"
                  value={formData.deliveryDate}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-pink-600 text-white py-3 px-6 rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 font-medium text-lg"
              >
                Submit Custom Order
              </button>
            </form>
          </div>
        )}

        {/* Information Section */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">How It Works</h3>
          <div className="space-y-2 text-blue-700">
            <p>• Fill out the form with your preferences</p>
            <p>• Our team will review your request within 24 hours</p>
            <p>• We'll contact you to confirm details and pricing</p>
            <p>• Your custom bouquet will be prepared and delivered on time</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizeOrders;
