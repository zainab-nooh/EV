import React, { useState, useEffect } from 'react';
import Header from '../../components/common/Header/Header';
import Navbar from '../../components/common/Navbar/Navbar';
import Footer from '../../components/common/Footer/Footer';
import CategoryList from '../../components/createBooking/CategoryList/CategoryList';
import ItemList from '../../components/createBooking/ItemList/ItemList';
import BookingCart from '../../components/bookingHistory/BookingCart/BookingCart';
import styles from './CreateBooking.module.scss';

export default function CreateBooking({ setUser }) {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('eventCart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (err) {
        console.error('Error loading cart:', err);
        localStorage.removeItem('eventCart');
      }
    }
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('eventCart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('eventCart');
    }
  }, [cart]);

  // Fetch categories
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch items when category changes
  useEffect(() => {
    if (selectedCategory) {
      fetchItemsByCategory(selectedCategory._id);
    }
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/categories', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to fetch categories');
      const data = await res.json();
      setCategories(data.categories || []);
      if (data.categories?.length > 0) {
        setSelectedCategory(data.categories[0]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchItemsByCategory = async (categoryId) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/items/category/${categoryId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to fetch items');
      const data = await res.json();
      setItems(data.items || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const addToCart = (item) => {
    setCart((prev) => {
      const found = prev.find((ci) => ci._id === item._id);
      if (found) {
        return prev.map((ci) =>
          ci._id === item._id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
    
    // Show success message
    alert(`${item.name} added to cart!`);
  };

  const getCartItemCount = () =>
    cart.reduce((total, item) => total + item.quantity, 0);

  const getCartTotal = () =>
    cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleCheckout = async (bookingData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingData)
      });

      if (!response.ok) {
        throw new Error('Failed to create booking');
      }

      const result = await response.json();
      
      // Clear cart after successful checkout
      setCart([]);
      localStorage.removeItem('eventCart');
      setShowCart(false);
      
      alert('Booking created successfully! Starting new event.');
      
      return result;
    } catch (error) {
      console.error('Checkout error:', error);
      throw error;
    }
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  if (loading && categories.length === 0) {
    return <div className={styles.loading}>Loading categories...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <>
      {/* Common Layout */}
      <Header />

      {/* Page Content */}
      <main className={styles.CreateBooking}>
        {/* Page Title */}
        <div className={styles.sectionHeading}>
          <span>CREATE BOOKING</span>
          <button 
            className={styles.cartToggle}
            onClick={toggleCart}
          >
            Cart ({getCartItemCount()} items) - ${getCartTotal().toFixed(2)}
          </button>
        </div>

        <div className={styles.content}>
          {/* Sidebar Categories */}
          <div className={styles.sidebar}>
            <h2>Categories</h2>
            <CategoryList
              categories={categories}
              selectedCategory={selectedCategory}
              onCategorySelect={handleCategorySelect}
            />
          </div>

          {/* Main Items List */}
          <div className={`${styles.itemsContainer} flex-col scroll-y`}>
            <h2>
              {selectedCategory
                ? `${selectedCategory.name} Items`
                : 'Select a Category'}
            </h2>

            {loading ? (
              <div className={styles.loading}>Loading items...</div>
            ) : (
              <ItemList items={items} onAddToCart={addToCart} cart={cart} />
            )}
          </div>
        </div>

        {/* Cart Summary */}
        <section className={styles.total}>
          {cart.length ? (
            <>
              <button
                className="btn-sm"
                onClick={toggleCart}
              >
                {showCart ? 'HIDE CART' : 'VIEW CART'}
              </button>
              <span>{getCartItemCount()} items - ${getCartTotal().toFixed(2)}</span>
            </>
          ) : (
            <div className={styles.empty}>Cart is empty</div>
          )}
        </section>
      </main>

      {/* Cart Popup */}
      {showCart && (
        <div className={styles.cartOverlay}>
          <div className={styles.cartPopup}>
            <div className={styles.cartHeader}>
              <h2>Your Event Cart</h2>
              <button 
                className={styles.closeBtn}
                onClick={() => setShowCart(false)}
              >
                ×
              </button>
            </div>
            <BookingCart onCheckout={handleCheckout} />
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </>
  );
}
