import React, { useState, useEffect } from 'react';
import BookingCart from './BookingCart';

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
      <div className="checkout-success">
        <div className="success-container">
          <div className="success-icon">
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

          <h1 className="success-title">Order Complete!</h1>
          <p className="success-message">
            Your booking has been successfully created.
          </p>

          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="summary-item">
              <span>Order ID:</span>
              <span>#{orderDetails._id.slice(-8).toUpperCase()}</span>
            </div>
            <div className="summary-item">
              <span>Total Items:</span>
              <span>{orderDetails.items.length}</span>
            </div>
            <div className="summary-item">
              <span>Total Amount:</span>
              <span className="total-amount">${orderDetails.totalAmount.toFixed(2)}</span>
            </div>
            <div className="summary-item">
              <span>Order Date:</span>
              <span>{new Date(orderDetails.orderDate).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="success-actions">
            <button 
              className="btn btn-primary"
              onClick={handleStartNewOrder}
            >
              Start New Order
            </button>
            <button 
              className="btn btn-secondary"
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
    <div className="checkout-page">
      <div className="checkout-header">
        <h1>Checkout</h1>
        <p>Review your items and complete your order</p>
      </div>

      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button 
            className="btn btn-outline"
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