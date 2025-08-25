import React from 'react';

const BookingDetail = ({ booking, onBack, allBookings, onBookingSelect }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#f39c12';
      case 'confirmed': return '#3498db';
      case 'completed': return '#27ae60';
      case 'cancelled': return '#e74c3c';
      default: return '#666';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateItemTotal = (item) => {
    return (item.price * item.quantity).toFixed(2);
  };

  // Filter out current booking from sidebar list
  const otherBookings = allBookings.filter(b => b._id !== booking._id);

  return (
    <div className="booking-detail">
      <div className="detail-sidebar">
        <div className="sidebar-header">
          <h3>Other Orders</h3>
        </div>
        
        <div className="sidebar-bookings">
          {otherBookings.length === 0 ? (
            <p className="no-other-orders">No other orders</p>
          ) : (
            otherBookings.map(otherBooking => (
              <div 
                key={otherBooking._id}
                className="sidebar-booking"
                onClick={() => onBookingSelect(otherBooking)}
              >
                <div className="sidebar-booking-header">
                  <span className="booking-id">
                    #{otherBooking._id.slice(-6).toUpperCase()}
                  </span>
                  <span 
                    className="booking-status-small"
                    style={{ backgroundColor: getStatusColor(otherBooking.status) }}
                  >
                    {otherBooking.status}
                  </span>
                </div>
                <div className="sidebar-booking-info">
                  <span className="booking-date">
                    {new Date(otherBooking.orderDate).toLocaleDateString()}
                  </span>
                  <span className="booking-total">
                    ${otherBooking.totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        <button className="btn btn-secondary back-btn" onClick={onBack}>
          ← Back to All Orders
        </button>
      </div>

      <div className="detail-main">
        <div className="detail-header">
          <div className="header-top">
            <h1>Order Details</h1>
            <div 
              className="status-badge"
              style={{ backgroundColor: getStatusColor(booking.status) }}
            >
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </div>
          </div>
          
          <div className="order-info">
            <div className="info-item">
              <span className="label">Order ID:</span>
              <span className="value">#{booking._id.slice(-8).toUpperCase()}</span>
            </div>
            <div className="info-item">
              <span className="label">Order Date:</span>
              <span className="value">{formatDate(booking.orderDate)}</span>
            </div>
            <div className="info-item">
              <span className="label">Total Items:</span>
              <span className="value">{booking.items.length}</span>
            </div>
          </div>
        </div>

        <div className="items-section">
          <h2>Order Items</h2>
          <div className="items-list">
            {booking.items.map((item, index) => (
              <div key={index} className="order-item">
                <div className="item-image">
                  {item.item?.picture ? (
                    <img src={item.item.picture} alt={item.item.name} />
                  ) : (
                    <div className="placeholder-image">
                      <span>No Image</span>
                    </div>
                  )}
                </div>

                <div className="item-info">
                  <h3 className="item-name">
                    {item.item?.name || 'Item Name Not Available'}
                  </h3>
                  {item.item?.details && (
                    <p className="item-description">{item.item.details}</p>
                  )}
                  <div className="item-pricing">
                    <span className="unit-price">
                      ${item.price.toFixed(2)} each
                    </span>
                  </div>
                </div>

                <div className="item-quantity">
                  <span className="quantity-label">Qty:</span>
                  <span className="quantity-value">{item.quantity}</span>
                </div>

                <div className="item-total">
                  <span className="total-label">Total:</span>
                  <span className="total-value">${calculateItemTotal(item)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="summary-content">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${booking.totalAmount.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Tax:</span>
              <span>$0.00</span>
            </div>
            <div className="summary-row total-row">
              <span>Total:</span>
              <span>${booking.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {booking.notes && (
          <div className="notes-section">
            <h2>Notes</h2>
            <p className="notes-content">{booking.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingDetail;