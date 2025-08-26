import React, { useState, useEffect } from 'react';
import CartItem from '../CartItem/CartItem';
import styles from './BookingCart.module.scss';

export default function BookingCart({ onCheckout }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('eventCart');
    if (savedCart) setCartItems(JSON.parse(savedCart));
  }, []);

  const saveCart = (newCart) => {
    localStorage.setItem('eventCart', JSON.stringify(newCart));
    setCartItems(newCart);
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return removeItem(itemId);

    const updatedCart = cartItems.map(item =>
      item._id === itemId ? { ...item, quantity: newQuantity } : item
    );
    saveCart(updatedCart);
  };

  const removeItem = (itemId) => {
    const updatedCart = cartItems.filter(item => item._id !== itemId);
    saveCart(updatedCart);
  };

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (!cartItems.length) return;
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
      if (onCheckout) await onCheckout(bookingData);
      localStorage.removeItem('eventCart');
      setCartItems([]);
    } catch (err) {
      console.error(err);
      alert('Error processing your order. Try again.');
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

  if (!cartItems.length) {
    return (
      <div className={styles.bookingCart}>
        <div className={styles.empty}>
          <h2>Your cart is empty</h2>
          <p>Add some items to get started!</p>
          <button
            className={styles.btnPrimary}
            onClick={() => window.location.href = '/create-booking'}
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.bookingCart}>
      <div className={styles.cartHeader}>
        <h2>Your Cart</h2>
        <button
          className={styles.btnOutline}
          onClick={clearCart}
          disabled={loading}
        >
          Clear Cart
        </button>
      </div>

      <div className={`${styles.cartItems} flex-col scroll-y`}>
        {cartItems.map(item => (
          <CartItem
            key={item._id}
            item={item}
            onUpdateQuantity={updateQuantity}
            onRemove={removeItem}
          />
        ))}

        <section className={styles.cartSummary}>
          <span>Total Items: {cartItems.length}</span>
          <span className={styles.right}>${calculateTotal().toFixed(2)}</span>
          <button
            className={styles.btnPrimary}
            onClick={handleCheckout}
            disabled={loading || !cartItems.length}
          >
            {loading ? 'Processing...' : 'Checkout'}
          </button>
        </section>
      </div>
    </div>
  );
}
