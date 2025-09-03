// client/src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import ProductCard from '../components/customer/ProductCard';
import '../styles/pages/HomePage.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['Birthdays', 'Valentine', 'Graduation']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch products from API
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/products`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        setError('Failed to fetch products');
      }
    } catch (error) {
      setError('Error loading products: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter products by category
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading beautiful flowers...</p>
      </div>
    );
  }

  return (
    <div className="homepage">
      {/* Welcome Section */}
      <section className="welcome-section">
        <div className="welcome-banner">
          <img 
            src="/images/banners/home-welcome-banner.jpg" 
            alt="Welcome to Nonimi Flora" 
            className="welcome-image"
          />
          <div className="welcome-overlay">
            <h1>Welcome to Nonimi Flora</h1>
            <p>Your perfect destination for fresh, beautiful flower bouquets</p>
            <p>Creating memorable moments with nature's finest blooms</p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <h2>Shop by Categories</h2>
          <div className="category-filters">
            <button 
              className={selectedCategory === 'All' ? 'active' : ''}
              onClick={() => handleCategoryClick('All')}
            >
              All Products
            </button>
            {categories.map(category => (
              <button 
                key={category}
                className={selectedCategory === category ? 'active' : ''}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section">
        <div className="container">
          <h2>
            {selectedCategory === 'All' 
              ? 'Our Beautiful Collection' 
              : `${selectedCategory} Collection`
            }
          </h2>
          
          {error && (
            <div className="error-message">
              <p>{error}</p>
              <button onClick={fetchProducts} className="retry-btn">
                Try Again
              </button>
            </div>
          )}

          <div className="products-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <ProductCard 
                  key={product._id} 
                  product={product} 
                />
              ))
            ) : (
              <div className="no-products">
                <p>No products available in this category.</p>
                <p>Check back soon for new arrivals!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Info Section */}
      <section className="info-section">
        <div className="container">
          <div className="info-cards">
            <div className="info-card">
              <h3>🌹 Fresh Daily</h3>
              <p>We receive fresh flowers daily to ensure the highest quality</p>
            </div>
            <div className="info-card">
              <h3>🚚 Fast Delivery</h3>
              <p>Same day delivery available in Nugegoda and surrounding areas</p>
            </div>
            <div className="info-card">
              <h3>💝 Custom Orders</h3>
              <p>Create personalized bouquets for your special occasions</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;