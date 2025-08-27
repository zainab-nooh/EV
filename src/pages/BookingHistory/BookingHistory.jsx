import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './bookinghistory.module.scss';

const BookingHistory = ({setUser}) => {
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
      // TODO: Replace with actual API call when bookings-api.js is ready
      // const userBookings = await bookingsAPI.getUserBookings();
      
      // Mock data for now - replace with actual API call
      const mockBookings = [
        {
          _id: '1',
          orderDate: '2024-01-15T10:30:00Z',
          status: 'completed',
          totalAmount: 1250.00,
          items: [
            { item: { name: 'Wedding Arch', _id: '1' }, quantity: 1, price: 500 },
            { item: { name: 'Round Tables', _id: '2' }, quantity: 10, price: 75 }
          ],
          notes: 'Wedding ceremony setup'
        },
        {
          _id: '2',
          orderDate: '2024-01-10T14:20:00Z',
          status: 'confirmed',
          totalAmount: 850.00,
          items: [
            { item: { name: 'Sound System', _id: '3' }, quantity: 1, price: 300 },
            { item: { name: 'Microphones', _id: '4' }, quantity: 2, price: 50 },
            { item: { name: 'Lighting Kit', _id: '5' }, quantity: 1, price: 450 }
          ],
          notes: 'Corporate event equipment'
        }
      ];
      
      setBookings(mockBookings);
      if (mockBookings.length > 0 && !selectedBooking) {
        setSelectedBooking(mockBookings[0]);
      }
    } catch (err) {
      setError('Failed to load booking history');
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
    navigate(`/booking-history?bookingId=${booking._id}`);
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading booking history...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>{error}</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Booking History</h1>
      
      <div className={styles.content}>
        {/* Left Sidebar - Booking List */}
        <div className={styles.sidebar}>
          <h2 className={styles.sidebarTitle}>Your Orders</h2>
          {bookings.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No bookings found</p>
              <button 
                className={styles.createBookingBtn}
                onClick={() => navigate('/create-booking')}
              >
                Create Your First Booking
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
                    <span className={styles.orderId}>Order #{booking._id}</span>
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
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Content - Booking Details */}
        <div className={styles.details}>
          {selectedBooking ? (
            <>
              <div className={styles.detailsHeader}>
                <h2>Order #{selectedBooking._id}</h2>
                <span className={`${styles.status} ${getStatusClass(selectedBooking.status)}`}>
                  {selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1)}
                </span>
              </div>

              <div className={styles.orderInfo}>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Order Date:</span>
                  <span className={styles.value}>{formatDate(selectedBooking.orderDate)}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Total Amount:</span>
                  <span className={styles.value}>${selectedBooking.totalAmount.toFixed(2)}</span>
                </div>
                {selectedBooking.notes && (
                  <div className={styles.infoRow}>
                    <span className={styles.label}>Notes:</span>
                    <span className={styles.value}>{selectedBooking.notes}</span>
                  </div>
                )}
              </div>

              <div className={styles.itemsSection}>
                <h3>Items Ordered</h3>
                <div className={styles.itemsList}>
                  {selectedBooking.items.map((bookingItem, index) => (
                    <div key={index} className={styles.item}>
                      <div className={styles.itemInfo}>
                        <span className={styles.itemName}>{bookingItem.item.name}</span>
                        <span className={styles.itemPrice}>
                          ${bookingItem.price.toFixed(2)} each
                        </span>
                      </div>
                      <div className={styles.itemQuantity}>
                        <span>Qty: {bookingItem.quantity}</span>
                        <span className={styles.itemTotal}>
                          ${(bookingItem.price * bookingItem.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.actionsSection}>
                <button 
                  className={styles.reorderBtn}
                  onClick={() => {
                    // TODO: Implement reorder functionality
                    console.log('Reorder items:', selectedBooking.items);
                    navigate('/create-booking');
                  }}
                >
                  Reorder Items
                </button>
                <button 
                  className={styles.backBtn}
                  onClick={() => navigate('/profile')}
                >
                  Back to Profile
                </button>
              </div>
            </>
          ) : (
            <div className={styles.selectPrompt}>
              <h2>Select a booking to view details</h2>
              <p>Choose an order from the left to see its full details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingHistory;