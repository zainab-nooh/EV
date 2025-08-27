import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../../components/common/Header/Header';
import Footer from '../../components/common/Footer/Footer';
import BookingDetail from '../../components/bookingHistory/BookingDetail/BookingDetail';
import styles from './BookingHistory.module.scss';

const BookingHistory = ({ setUser }) => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get('bookingId');

  useEffect(() => {
    fetchBookingHistory();
  }, []);

  useEffect(() => {
    if (bookingId && bookings.length > 0) {
      const booking = bookings.find(b => b._id === bookingId);
      if (booking) {
        setSelectedBooking(booking);
      }
    } else if (bookings.length > 0 && !selectedBooking) {
      setSelectedBooking(bookings[0]);
    }
  }, [bookingId, bookings]);

  const fetchBookingHistory = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to view your booking history');
        setLoading(false);
        return;
      }

      const response = await fetch('/api/bookings/history', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          setError('Session expired. Please log in again.');
          navigate('/auth');
          return;
        }
        throw new Error(`Failed to fetch bookings: ${response.status}`);
      }

      const data = await response.json();
      setBookings(data || []);
      if (data.length > 0 && !selectedBooking) {
        setSelectedBooking(data[0]);
      }
    } catch (err) {
      setError(err.message || 'Failed to load booking history');
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
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

  const getStatusClass = (status) => {
    switch (status) {
      case 'completed': return styles.statusCompleted;
      case 'confirmed': return styles.statusConfirmed;
      case 'pending': return styles.statusPending;
      case 'cancelled': return styles.statusCancelled;
      default: return styles.statusDefault;
    }
  };

  const handleBookingSelect = (booking) => {
    setSelectedBooking(booking);
    // Fixed: Use the correct route path
    navigate(`/bookings/history?bookingId=${booking._id}`);
  };

  const handleCreateNewBooking = () => {
    navigate('/bookings/new'); // Fixed: Use correct route
  };

  const handleReorder = (booking) => {
    // Add all items from the booking back to cart
    const existingCart = localStorage.getItem('eventCart');
    let cart = existingCart ? JSON.parse(existingCart) : [];
    
    booking.items.forEach(bookingItem => {
      const existingCartItem = cart.find(ci => ci._id === bookingItem.item._id);
      if (existingCartItem) {
        existingCartItem.quantity += bookingItem.quantity;
      } else {
        cart.push({
          _id: bookingItem.item._id,
          name: bookingItem.item.name,
          price: bookingItem.price,
          quantity: bookingItem.quantity,
          description: bookingItem.item.description,
          details: bookingItem.item.details,
          picture: bookingItem.item.picture
        });
      }
    });
    
    localStorage.setItem('eventCart', JSON.stringify(cart));
    navigate('/bookings/new'); // Fixed: Use correct route
  };

  if (loading) {
    return (
      <>
        <Header setUser={setUser} />
        <div className={styles.container}>
          <div className={styles.loading}>Loading booking history...</div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header setUser={setUser} />

        <div className={styles.container}>
          <div className={styles.error}>
            <h2>Unable to Load History</h2>
            <p>{error}</p>
            <div className={styles.errorActions}>
              <button
                className={styles.retryBtn}
                onClick={fetchBookingHistory}
              >
                Try Again
              </button>
              <button
                className={styles.createBookingBtn}
                onClick={handleCreateNewBooking}
              >
                Create New Booking
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header setUser={setUser} />

      <div className={styles.container}>
        <h1 className={styles.title}>Booking History</h1>
        <div className={styles.content}>
          {/* Left Sidebar - Booking List */}
          <div className={styles.sidebar}>
            <h2 className={styles.sidebarTitle}>Your Events</h2>
            {bookings.length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>
                  <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                    <rect x="10" y="15" width="40" height="30" rx="3" stroke="#ccc" strokeWidth="2" fill="none"/>
                    <path d="M18 25h24M18 32h16M18 39h20" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="45" cy="20" r="6" stroke="#ccc" strokeWidth="2" fill="none"/>
                  </svg>
                </div>
                <p>No events found</p>
                <p className={styles.emptySubtext}>Start creating your first event booking</p>
                <button
                  className={styles.createBookingBtn}
                  onClick={handleCreateNewBooking}
                >
                  Create Your First Event
                </button>
              </div>
            ) : (
              <div className={styles.bookingsList}>
                {bookings.map((booking) => (
                  <div
                    key={booking._id}
                    className={`${styles.bookingItem} ${
                      selectedBooking?._id === booking._id ? styles.active : ''
                    }`}
                    onClick={() => handleBookingSelect(booking)}
                  >
                    <div className={styles.bookingHeader}>
                      <span className={styles.orderId}>
                        Event #{booking._id.slice(-6).toUpperCase()}
                      </span>
                      <span className={`${styles.status} ${getStatusClass(booking.status)}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>
                    <div className={styles.bookingMeta}>
                      <span className={styles.date}>
                        {new Date(booking.orderDate).toLocaleDateString()}
                      </span>
                      <span className={styles.amount}>
                        ${booking.totalAmount.toFixed(2)}
                      </span>
                    </div>
                    <div className={styles.bookingPreview}>
                      <span className={styles.itemCount}>
                        {booking.items.length} item{booking.items.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Right Content - Booking Details */}
          <div className={styles.details}>
            {selectedBooking ? (
              <BookingDetail
                booking={selectedBooking}
                onReorder={handleReorder}
                formatDate={formatDate}
                getStatusClass={getStatusClass}
              />
            ) : (
              <div className={styles.selectPrompt}>
                <h2>Select an event to view details</h2>
                <p>Choose an event from the left to see its full details</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookingHistory;