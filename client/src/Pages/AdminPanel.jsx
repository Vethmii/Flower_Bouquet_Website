import React, { useState } from 'react';

const AdminPanel = ({ 
  products, 
  feedbacks, 
  addProduct, 
  editProduct, 
  deleteProduct, 
  addFeedback 
}) => {
  const [activeTab, setActiveTab] = useState('products');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddFeedback, setShowAddFeedback] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [newProduct, setNewProduct] = useState({
    name: '',
    image: '',
    category: 'Birthdays',
    price: '',
    description: ''
  });

  const [newFeedback, setNewFeedback] = useState({
    customerName: '',
    rating: 5,
    comment: '',
    occasion: 'Birthday'
  });

  const handleAddProduct = (e) => {
    e.preventDefault();
    addProduct({
      ...newProduct,
      price: parseFloat(newProduct.price)
    });
    setNewProduct({
      name: '',
      image: '',
      category: 'Birthdays',
      price: '',
      description: ''
    });
    setShowAddProduct(false);
  };

  const handleEditProduct = (e) => {
    e.preventDefault();
    editProduct(editingProduct.id, {
      ...newProduct,
      price: parseFloat(newProduct.price)
    });
    setEditingProduct(null);
    setNewProduct({
      name: '',
      image: '',
      category: 'Birthdays',
      price: '',
      description: ''
    });
  };

  const handleAddFeedback = (e) => {
    e.preventDefault();
    addFeedback({
      ...newFeedback,
      date: new Date().toISOString().split('T')[0]
    });
    setNewFeedback({
      customerName: '',
      rating: 5,
      comment: '',
      occasion: 'Birthday'
    });
    setShowAddFeedback(false);
  };

  const startEdit = (product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      image: product.image,
      category: product.category,
      price: product.price.toString(),
      description: product.description
    });
  };

  const cancelEdit = () => {
    setEditingProduct(null);
    setNewProduct({
      name: '',
      image: '',
      category: 'Birthdays',
      price: '',
      description: ''
    });
  };

  const orders = JSON.parse(localStorage.getItem('nonimi_orders') || '[]');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
          <p className="text-gray-600">Manage products and customer feedback</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'products'
                ? 'text-pink-600 border-b-2 border-pink-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Products ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('feedbacks')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'feedbacks'
                ? 'text-pink-600 border-b-2 border-pink-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Feedbacks ({feedbacks.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'orders'
                ? 'text-pink-600 border-b-2 border-pink-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Orders ({orders.length})
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'products' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Product Management</h2>
                <button
                  onClick={() => setShowAddProduct(true)}
                  className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700"
                >
                  Add New Product
                </button>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map(product => (
                  <div key={product.id} className="border border-gray-200 rounded-lg p-4">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-32 object-cover rounded mb-3"
                    />
                    <h3 className="font-semibold text-gray-800">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                    <p className="text-pink-600 font-bold">${product.price}</p>
                    <div className="flex space-x-2 mt-3">
                      <button
                        onClick={() => startEdit(product)}
                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'feedbacks' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Customer Feedback</h2>
                <button
                  onClick={() => setShowAddFeedback(true)}
                  className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700"
                >
                  Add Feedback
                </button>
              </div>

              {/* Feedbacks List */}
              <div className="space-y-4">
                {feedbacks.map(feedback => (
                  <div key={feedback.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-800">{feedback.customerName}</h3>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < feedback.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 mb-2">"{feedback.comment}"</p>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{feedback.date}</span>
                      <span>{feedback.occasion}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Custom Orders</h2>
              <div className="space-y-4">
                {orders.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No custom orders yet.</p>
                ) : (
                  orders.map(order => (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-semibold text-gray-800">{order.customerName}</h3>
                          <p className="text-gray-600">Contact: {order.contactNo}</p>
                          <p className="text-gray-600">Occasion: {order.occasionType}</p>
                          <p className="text-gray-600">Delivery: {order.deliveryDate}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Flowers: {order.preferredFlowers || 'No preference'}</p>
                          <p className="text-gray-600">Wrapping: {order.wrappingStyle || 'No preference'}</p>
                          <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full mt-2">
                            {order.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Product Modal */}
      {(showAddProduct || editingProduct) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h3>
            <form onSubmit={editingProduct ? handleEditProduct : handleAddProduct}>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Product Name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
                <input
                  type="url"
                  placeholder="Image URL"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="Birthdays">Birthdays</option>
                  <option value="Valentine">Valentine</option>
                  <option value="Graduation">Graduation</option>
                </select>
                <input
                  type="number"
                  step="0.01"
                  placeholder="Price"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
                <textarea
                  placeholder="Description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows="3"
                  required
                />
              </div>
              <div className="flex space-x-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700"
                >
                  {editingProduct ? 'Update' : 'Add'} Product
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddProduct(false);
                    cancelEdit();
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Feedback Modal */}
      {showAddFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4">Add Customer Feedback</h3>
            <form onSubmit={handleAddFeedback}>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Customer Name"
                  value={newFeedback.customerName}
                  onChange={(e) => setNewFeedback({...newFeedback, customerName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
                <select
                  value={newFeedback.rating}
                  onChange={(e) => setNewFeedback({...newFeedback, rating: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value={5}>5 Stars</option>
                  <option value={4}>4 Stars</option>
                  <option value={3}>3 Stars</option>
                  <option value={2}>2 Stars</option>
                  <option value={1}>1 Star</option>
                </select>
                <textarea
                  placeholder="Customer Comment"
                  value={newFeedback.comment}
                  onChange={(e) => setNewFeedback({...newFeedback, comment: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows="3"
                  required
                />
                <select
                  value={newFeedback.occasion}
                  onChange={(e) => setNewFeedback({...newFeedback, occasion: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="Birthday">Birthday</option>
                  <option value="Valentine">Valentine</option>
                  <option value="Graduation">Graduation</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="flex space-x-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700"
                >
                  Add Feedback
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddFeedback(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;