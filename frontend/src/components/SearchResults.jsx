import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './SearchResults.css';

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  
  // Get search query from URL parameters
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';

  useEffect(() => {
    // Simulate search functionality
    const performSearch = async () => {
      setLoading(true);
      
      // REPLACE THIS SECTION WITH YOUR ACTUAL PRODUCT DATA
      // This is mock data for Nonimi Flora flower shop
      const mockProducts = [
        { 
          id: 1, 
          name: 'Red Roses Bouquet', 
          category: 'valentine', 
          price: 'Rs. 2,500',
          image: '/images/red-roses.jpg',
          description: 'Beautiful red roses perfect for Valentine\'s Day and romantic occasions'
        },
        { 
          id: 2, 
          name: 'Birthday Celebration Mix', 
          category: 'birthday', 
          price: 'Rs. 1,999',
          image: '/images/birthday-flowers.jpg',
          description: 'Colorful mixed flowers arrangement for birthday celebrations'
        },
        { 
          id: 3, 
          name: 'Graduation Congratulations', 
          category: 'graduation', 
          price: 'Rs. 2,299',
          image: '/images/graduation-flowers.jpg',
          description: 'Elegant bouquet perfect for graduation ceremonies and achievements'
        },
        { 
          id: 4, 
          name: 'Pink Rose Garden', 
          category: 'valentine', 
          price: 'Rs. 1,899',
          image: '/images/pink-roses.jpg',
          description: 'Soft pink roses arranged beautifully for romantic gestures'
        },
        { 
          id: 5, 
          name: 'Sunflower Surprise', 
          category: 'birthday', 
          price: 'Rs. 1,599',
          image: '/images/sunflowers.jpg',
          description: 'Bright sunflowers to brighten someone\'s special day'
        },
        { 
          id: 6, 
          name: 'White Lily Elegance', 
          category: 'graduation', 
          price: 'Rs. 2,199',
          image: '/images/white-lilies.jpg',
          description: 'Pure white lilies symbolizing new beginnings and achievements'
        },
        { 
          id: 7, 
          name: 'Mixed Seasonal Bouquet', 
          category: 'birthday', 
          price: 'Rs. 1,799',
          image: '/images/mixed-flowers.jpg',
          description: 'Vibrant seasonal flowers arranged in a stunning bouquet'
        },
        { 
          id: 8, 
          name: 'Anniversary Special', 
          category: 'valentine', 
          price: 'Rs. 3,200',
          image: '/images/anniversary-flowers.jpg',
          description: 'Premium flower arrangement for anniversary celebrations'
        },
        { 
          id: 9, 
          name: 'Graduation Glory', 
          category: 'graduation', 
          price: 'Rs. 2,500',
          image: '/images/graduation-special.jpg',
          description: 'Special graduation bouquet with congratulatory ribbon'
        },
        { 
          id: 10, 
          name: 'Birthday Joy Bundle', 
          category: 'birthday', 
          price: 'Rs. 2,100',
          image: '/images/birthday-joy.jpg',
          description: 'Happy birthday flower bundle with colorful blooms'
        }
      ];

      // Filter products based on search query (search in name, category, and description)
      const filteredResults = mockProducts.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      );

      // Simulate API delay for realistic experience
      setTimeout(() => {
        setSearchResults(filteredResults);
        setLoading(false);
      }, 800);
    };

    if (query) {
      performSearch();
    } else {
      setSearchResults([]);
      setLoading(false);
    }
  }, [query]);

  // Handle add to cart functionality
  const handleAddToCart = (product) => {
    // Replace this with your actual cart functionality
    console.log('Adding to cart:', product);
    
    // You can integrate with your cart state management here
    // For now, showing an alert
    alert(`✅ ${product.name} added to cart!\n💰 Price: ${product.price}`);
    
    // Example of what you might do:
    // dispatch(addToCart(product));
    // or
    // addItemToCart(product);
  };

  // Loading state
  if (loading) {
    return (
      <div className="search-results-container">
        <div className="loading">
          <h2>🔍 Searching...</h2>
          <p>Looking for "{query}" in our beautiful flower collection</p>
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="search-results-container">
      {/* Search Header */}
      <div className="search-header">
        <h2>🌸 Search Results for "{query}"</h2>
        <p className="results-count">
          {searchResults.length} {searchResults.length === 1 ? 'beautiful flower arrangement' : 'beautiful flower arrangements'} found
        </p>
      </div>
      
      {/* Results or No Results */}
      {searchResults.length > 0 ? (
        <div className="results-grid">
          {searchResults.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img 
                  src={product.image} 
                  alt={product.name}
                  onError={(e) => {
                    // Fallback to placeholder image if main image fails to load
                    e.target.src = '/images/placeholder-flower.jpg';
                  }}
                />
                <div className="product-overlay">
                  <span className="category-tag">{product.category}</span>
                </div>
              </div>
              
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-description">{product.description}</p>
                
                <div className="product-footer">
                  <span className="price">{product.price}</span>
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    🛒 Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-results">
          <div className="no-results-icon">🌺</div>
          <h3>No flowers found</h3>
          <p>Sorry, we couldn't find any flower arrangements matching "{query}"</p>
          <p>Try searching with different keywords or browse our popular categories:</p>
          
          <div className="suggested-links">
            <Link to="/category/birthday" className="suggestion-link">
              🎂 Birthday Flowers
            </Link>
            <Link to="/category/valentine" className="suggestion-link">
              💕 Valentine Flowers
            </Link>
            <Link to="/category/graduation" className="suggestion-link">
              🎓 Graduation Flowers
            </Link>
            <Link to="/daily-deals" className="suggestion-link">
              💰 Daily Deals
            </Link>
          </div>
          
          <div className="search-suggestions">
            <h4>💡 Search Tips:</h4>
            <ul>
              <li>Try searching for flower types: "roses", "lilies", "sunflowers"</li>
              <li>Search by occasion: "birthday", "valentine", "graduation"</li>
              <li>Use simpler terms: "red flowers", "pink bouquet"</li>
            </ul>
          </div>
        </div>
      )}
      
      {/* Back to Shopping Link */}
      <div className="back-to-shopping">
        <Link to="/" className="back-link">
          ← Continue Shopping at Nonimi Flora
        </Link>
      </div>
    </div>
  );
};

export default SearchResults;