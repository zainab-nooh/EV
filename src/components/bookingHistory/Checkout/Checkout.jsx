import React, { useState, useEffect } from 'react';
import BookingCart from '../BookingCart/BookingCart';
import style from "./Checkout.module.scss";

const Checkout = () => {
  const [orderComplete, setOrderComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState(null);

  const handleCheckout = async (bookingData) => {
    setLoading(true);
    setError(null);

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
      setOrderDetails(result.booking);
      setOrderComplete(true);
      
      // Clear any error state
      setError(null);
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err.message || 'There was an error processing your order');
    } finally {
      setLoading(false);
    }
  };

  const handleStartNewOrder = () => {
    setOrderComplete(false);
    setOrderDetails(null);
    setError(null);
    // Redirect to create booking page
    window.location.href = '/create-booking';
  };

  const handleViewOrderHistory = () => {
    window.location.href = '/booking-history';
  };

  if (orderComplete && orderDetails) {
    return (
      <div className={style.checkoutSuccess}>
        <div className={style.successContainer}>
          <div className={style.successIcon}>
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <circle cx="40" cy="40" r="40" fill="#27ae60"/>
              <path 
                d="M25 40L35 50L55 30" 
                stroke="white" 
                strokeWidth="4" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h1 className={style.successTitle}>Order Complete!</h1>
          <p className={style.successMessage}>
            Your booking has been successfully created.
          </p>

          <div className={style.orderSummary}>
            <h3>Order Summary</h3>
            <div className={style.summaryItem}>
              <span>Order ID:</span>
              <span>#{orderDetails._id.slice(-8).toUpperCase()}</span>
            </div>
            <div className={style.summaryItem}>
              <span>Total Items:</span>
              <span>{orderDetails.items.length}</span>
            </div>
            <div className={style.summaryItem}>
              <span>Total Amount:</span>
              <span className={style.totalAmount}>${orderDetails.totalAmount.toFixed(2)}</span>
            </div>
            <div className={style.summaryItem}>
              <span>Order Date:</span>
              <span>{new Date(orderDetails.orderDate).toLocaleDateString()}</span>
            </div>
          </div>

          <div className={style.successActions}>
            <button 
              className={`${style.btn} ${style.btnPrimary}`}
              onClick={handleStartNewOrder}
            >
              Start New Order
            </button>
            <button 
              className={`${style.btn} ${style.btnSecondary}`}
              onClick={handleViewOrderHistory}
            >
              View Order History
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={style.checkoutPage}>
      <div className={style.checkoutHeader}>
        <h1>Checkout</h1>
        <p>Review your items and complete your order</p>
      </div>

      {error && (
        <div className={style.errorMessage}>
          <p>{error}</p>
          <button 
            className={`${style.btn} ${style.btnOutline}`}
            onClick={() => setError(null)}
          >
            Dismiss
          </button>
        </div>
      )}

      <BookingCart onCheckout={handleCheckout} />
    </div>
  );
};

export default Checkout;