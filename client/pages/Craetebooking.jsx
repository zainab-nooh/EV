import React, { useState, useEffect } from 'react';
import CategoryList from '../components/createBooking/CategoryList';
import ItemList from '../components/createBooking/ItemList';
import '../styles/CreateBooking.scss';

const CreateBooking = () => {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch items when category is selected
  useEffect(() => {
    if (selectedCategory) {
      fetchItemsByCategory(selectedCategory._id);
    }
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/categories', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }

      const data = await response.json();
      setCategories(data.categories || []);
      
      // Select first category by default
      if (data.categories && data.categories.length > 0) {
        setSelectedCategory(data.categories[0]);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchItemsByCategory = async (categoryId) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/items/category/${categoryId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch items');
      }

      const data = await response.json();
      setItems(data.items || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching items:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem._id === item._id);
      
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  if (loading && categories.length === 0) {
    return <div className="loading">Loading categories...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="create-booking">
      <div className="create-booking__header">
        <h1>Create Booking</h1>
        <div className="cart-indicator">
          Cart ({getCartItemCount()} items)
        </div>
      </div>

      <div className="create-booking__content">
        <div className="create-booking__sidebar">
          <h2>Categories</h2>
          <CategoryList
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
          />
        </div>

        <div className="create-booking__main">
          <div className="items-header">
            <h2>
              {selectedCategory ? `${selectedCategory.name} Items` : 'Select a Category'}
            </h2>
          </div>
          
          {loading ? (
            <div className="loading">Loading items...</div>
          ) : (
            <ItemList
              items={items}
              onAddToCart={addToCart}
              cart={cart}
            />
          )}
        </div>
      </div>

      {cart.length > 0 && (
        <div className="cart-summary">
          <div className="cart-summary__content">
            <span>Items in cart: {getCartItemCount()}</span>
            <button 
              className="btn btn-primary"
              onClick={() => window.location.href = '/checkout'}
            >
              Go to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateBooking;