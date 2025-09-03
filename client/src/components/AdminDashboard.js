// client/src/components/admin/AdminDashboard.js
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import FeedbackForm from './FeedbackForm';
import '../../styles/components/AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [products, setProducts] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalFeedback: 0,
    pendingOrders: 0,
    categories: {}
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated and is admin
    if (!user || user.userType !== 'admin') {
      navigate('/login');
      return;
    }
    
    fetchDashboardData();
  }, [user, navigate]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        fetchProducts(),
        fetchFeedback(),
        fetchOrders()
      ]);
    } catch (error) {
      setError('Failed to load dashboard data');
      console.error('Dashboard error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/products`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
        updateStats('products', data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchFeedback = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/feedback`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setFeedback(data);
        updateStats('feedback', data);
      }
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/orders`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
        updateStats('orders', data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const updateStats = (type, data) => {
    setStats(prevStats => {
      const newStats = { ...prevStats };
      
      if (type === 'products') {
        newStats.totalProducts = data.length;
        newStats.categories = data.reduce((acc, product) => {
          acc[product.category] = (acc[product.category] || 0) + 1;
          return acc;
        }, {});
      } else if (type === 'feedback') {
        newStats.totalFeedback = data.length;
      } else if (type === 'orders') {
        newStats.pendingOrders = data.filter(order => order.status === 'pending').length;
      }
      
      return newStats;
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleProductAdded = (newProduct) => {
    setProducts(prev => [...prev, newProduct]);
    updateStats('products', [...products, newProduct]);
  };

  const handleProductUpdated = (updatedProduct) => {
    setProducts(prev => 
      prev.map(product => 
        product._id === updatedProduct._id ? updatedProduct : product
      )
    );
  };

  const handleProductDeleted = (deletedProductId) => {
    const updatedProducts = products.filter(product => product._id !== deletedProductId);
    setProducts(updatedProducts);
    updateStats('products', updatedProducts);
  };

  const handleFeedbackAdded = (newFeedback) => {
    setFeedback(prev => [...prev, newFeedback]);
    updateStats('feedback', [...feedback, newFeedback]);
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Dashboard Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <img 
            src="/images/logo/nonimi-flora-logo.png" 
            alt="Nonimi Flora" 
            className="dashboard-logo"
          />
          <div className="header-info">
            <h1>Admin Dashboard</h1>
            <p>Welcome back, {user?.name || 'Administrator'}</p>
          </div>
        </div>
        <div className="header-right">
          <button onClick={handleLogout} className="logout-btn">
            🚪 Logout
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="dashboard-nav">
        <button 
          className={activeTab === 'overview' ? 'active' : ''}
          onClick={() => setActiveTab('overview')}
        >
          📊 Overview
        </button>
        <button 
          className={activeTab === 'products' ? 'active' : ''}
          onClick={() => setActiveTab('products')}
        >
          🌹 Manage Products
        </button>
        <button 
          className={activeTab === 'add-product' ? 'active' : ''}
          onClick={() => setActiveTab('add-product')}
        >
          ➕ Add Product
        </button>
        <button 
          className={activeTab === 'feedback' ? 'active' : ''}
          onClick={() => setActiveTab('feedback')}
        >
          💬 Customer Feedback
        </button>
        <button 
          className={activeTab === 'orders' ? 'active' : ''}
          onClick={() => setActiveTab('orders')}
        >
          📋 Custom Orders
        </button>
      </nav>

      {/* Dashboard Content */}
      <main className="dashboard-content">
        {error && (
          <div className="error-banner">
            <p>{error}</p>
            <button onClick={fetchDashboardData}>Retry</button>
          </div>
        )}

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="overview-section">
            <h2>Dashboard Overview</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">🌹</div>
                <div className="stat-info">
                  <h3>{stats.totalProducts}</h3>
                  <p>Total Products</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">💬</div>
                <div className="stat-info">
                  <h3>{stats.totalFeedback}</h3>
                  <p>Customer Reviews</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📋</div>
                <div className="stat-info">
                  <h3>{stats.pendingOrders}</h3>
                  <p>Pending Orders</p>
                </div>
              </div>
            </div>

            <div className="categories-overview">
              <h3>Products by Category</h3>
              <div className="categories-stats">
                {Object.entries(stats.categories).map(([category, count]) => (
                  <div key={category} className="category-stat">
                    <span className="category-name">{category}</span>
                    <span className="category-count">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Products Management Tab */}
        {activeTab === 'products' && (
          <div className="products-section">
            <h2>Manage Products</h2>
            <ProductList 
              products={products}
              onProductUpdated={handleProductUpdated}
              onProductDeleted={handleProductDeleted}
            />
          </div>
        )}

        {/* Add Product Tab */}
        {activeTab === 'add-product' && (
          <div className="add-product-section">
            <h2>Add New Product</h2>
            <ProductForm onProductAdded={handleProductAdded} />
          </div>
        )}

        {/* Feedback Tab */}
        {activeTab === 'feedback' && (
          <div className="feedback-section">
            <h2>Customer Feedback Management</h2>
            <FeedbackForm onFeedbackAdded={handleFeedbackAdded} />
            
            <div className="feedback-list">
              <h3>Recent Feedback</h3>
              {feedback.length > 0 ? (
                <div className="feedback-cards">
                  {feedback.slice(-5).reverse().map(item => (
                    <div key={item._id} className="feedback-card">
                      <div className="feedback-header">
                        <strong>{item.customerName}</strong>
                        <span className="feedback-date">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="feedback-text">{item.message}</p>
                      <div className="feedback-rating">
                        {'⭐'.repeat(item.rating || 5)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-data">No feedback available</p>
              )}
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="orders-section">
            <h2>Custom Orders</h2>
            {orders.length > 0 ? (
              <div className="orders-list">
                {orders.map(order => (
                  <div key={order._id} className="order-card">
                    <div className="order-header">
                      <h4>{order.customerName}</h4>
                      <span className={`status ${order.status}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="order-details">
                      <p><strong>Contact:</strong> {order.contactNo}</p>
                      <p><strong>Occasion:</strong> {order.occasionType}</p>
                      <p><strong>Preferred Flowers:</strong> {order.preferredFlowers}</p>
                      <p><strong>Delivery Date:</strong> {new Date(order.deliveryDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-data">No custom orders available</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;