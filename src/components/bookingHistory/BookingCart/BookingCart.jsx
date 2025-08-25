import React, { useState, useEffect } from 'react';
import CartItem from '../CartItem/CartItem';

const BookingCart = ({ onCheckout }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load cart from localStorage on component mount
    loadCart();
  }, []);

  const loadCart = () => {
    try {
      const savedCart = localStorage.getItem('eventCart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Error loading cart:', error);
      setCartItems([]);
    }
  };

  const saveCart = (newCart) => {
    localStorage.setItem('eventCart', JSON.stringify(newCart));
    setCartItems(newCart);
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(itemId);
      return;
    }

    const updatedCart = cartItems.map(item =>
      item._id === itemId ? { ...item, quantity: newQuantity } : item
    );
    saveCart(updatedCart);
  };

  const removeItem = (itemId) => {
    const updatedCart = cartItems.filter(item => item._id !== itemId);
    saveCart(updatedCart);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;

    setLoading(true);
    try {
      const bookingData = {
        items: cartItems.map(item => ({
          item: item._id,
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount: calculateTotal()
      };

      if (onCheckout) {
        await onCheckout(bookingData);
      }

      // Clear cart after successful checkout
      localStorage.removeItem('eventCart');
      setCartItems([]);
    } catch (error) {
      console.error('Checkout error:', error);
      alert('There was an error processing your order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const clearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      localStorage.removeItem('eventCart');
      setCartItems([]);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="booking-cart empty">
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Add some items to your cart to get started!</p>
          <button 
            className="btn btn-primary"
            onClick={() => window.location.href = '/create-booking'}
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-cart">
      <div className="cart-header">
        <h2>Your Cart</h2>
        <button 
          className="btn btn-outline"
          onClick={clearCart}
          disabled={loading}
        >
          Clear Cart
        </button>
      </div>

      <div className="cart-items">
        {cartItems.map(item => (
          <CartItem
            key={item._id}
            item={item}
            onUpdateQuantity={updateQuantity}
            onRemove={removeItem}
          />
        ))}
      </div>

      <div className="cart-summary">
        <div className="summary-row">
          <span>Subtotal:</span>
          <span>${calculateTotal().toFixed(2)}</span>
        </div>
        <div className="summary-row total">
          <span>Total:</span>
          <span>${calculateTotal().toFixed(2)}</span>
        </div>
      </div>

      <div className="cart-actions">
        <button
          className="btn btn-primary btn-large"
          onClick={handleCheckout}
          disabled={loading || cartItems.length === 0}
        >
          {loading ? 'Processing...' : `Checkout ($${calculateTotal().toFixed(2)})`}
        </button>
      </div>
    </div>
  );
};

export default BookingCart;