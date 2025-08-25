import React, { useState, useEffect } from 'react';
import BookingDetail from '../BookingDetail/BookingDetail';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookingHistory();
  }, []);

  const fetchBookingHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/bookings/user', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch booking history');
      }

      const data = await response.json();
      setBookings(data.bookings || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching booking history:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBookingSelect = (booking) => {
    setSelectedBooking(booking);
  };

  const handleBackToList = () => {
    setSelectedBooking(null);
  };

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
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="booking-history loading">
        <div className="loading-spinner"></div>
        <p>Loading your booking history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="booking-history error">
        <h2>Error Loading Booking History</h2>
        <p>{error}</p>
        <button 
          className="btn btn-primary"
          onClick={fetchBookingHistory}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (selectedBooking) {
    return (
      <BookingDetail 
        booking={selectedBooking} 
        onBack={handleBackToList}
        allBookings={bookings}
        onBookingSelect={handleBookingSelect}
      />
    );
  }

  return (
    <div className="booking-history">
      <div className="history-header">
        <h1>Booking History</h1>
        <p>View and manage your past orders</p>
      </div>

      {bookings.length === 0 ? (
        <div className="empty-history">
          <div className="empty-icon">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <rect x="15" y="20" width="50" height="40" rx="4" stroke="#ccc" strokeWidth="2" fill="none"/>
              <path d="M25 30h30M25 40h20M25 50h25" stroke="#ccc" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="60" cy="25" r="8" stroke="#ccc" strokeWidth="2" fill="none"/>
            </svg>
          </div>
          <h2>No Booking History</h2>
          <p>You haven't made any bookings yet. Start creating your first order!</p>
          <button 
            className="btn btn-primary"
            onClick={() => window.location.href = '/create-booking'}
          >
            Create Your First Booking
          </button>
        </div>
      ) : (
        <div className="history-list">
          {bookings.map(booking => (
            <div 
              key={booking._id} 
              className="booking-card"
              onClick={() => handleBookingSelect(booking)}
            >
              <div className="booking-header">
                <div className="booking-id">
                  <strong>Order #{booking._id.slice(-8).toUpperCase()}</strong>
                </div>
                <div 
                  className="booking-status"
                  style={{ backgroundColor: getStatusColor(booking.status) }}
                >
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </div>
              </div>

              <div className="booking-details">
                <div className="detail-item">
                  <span className="label">Date:</span>
                  <span className="value">{formatDate(booking.orderDate)}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Items:</span>
                  <span className="value">{booking.items.length} item(s)</span>
                </div>
                <div className="detail-item">
                  <span className="label">Total:</span>
                  <span className="value total">${booking.totalAmount.toFixed(2)}</span>
                </div>
              </div>

              <div className="booking-preview">
                {booking.items.slice(0, 3).map((item, index) => (
                  <span key={index} className="item-preview">
                    {item.item?.name || 'Item'} x{item.quantity}
                  </span>
                ))}
                {booking.items.length > 3 && (
                  <span className="more-items">
                    +{booking.items.length - 3} more
                  </span>
                )}
              </div>

              <div className="booking-actions">
                <span className="view-details">Click to view details →</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingHistory;