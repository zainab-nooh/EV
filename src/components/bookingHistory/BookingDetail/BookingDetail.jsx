import React from 'react';
import styles from './BookingDetail.module.scss'; 

const BookingDetail = ({ booking, onBack, allBookings, onBookingSelect }) => {

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

  const otherBookings = allBookings.filter(b => b._id !== booking._id);

  return (
    <div className={styles.bookingDetail}>
      <div className={styles.detailSidebar}>
        <div className={styles.sidebarHeader}>
          <h3>Other Orders</h3>
        </div>
        
        <div className={styles.sidebarBookings}>
          {otherBookings.length === 0 ? (
            <p className={styles.noOtherOrders}>No other orders</p>
          ) : (
            otherBookings.map(otherBooking => (
              <div 
                key={otherBooking._id}
                className={styles.sidebarBooking + ` ${styles[otherBooking.status]}`}
                onClick={() => onBookingSelect(otherBooking)}
              >
                <div className={styles.sidebarBookingHeader}>
                  <span className={styles.bookingId}>
                    #{otherBooking._id.slice(-6).toUpperCase()}
                  </span>
                  <span className={styles.bookingStatusSmall}>
                    {otherBooking.status}
                  </span>
                </div>
                <div className={styles.sidebarBookingInfo}>
                  <span className={styles.bookingDate}>
                    {new Date(otherBooking.orderDate).toLocaleDateString()}
                  </span>
                  <span className={styles.bookingTotal}>
                    ${otherBooking.totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        <button className={`btn btn-secondary ${styles.backBtn}`} onClick={onBack}>
          ← Back to All Orders
        </button>
      </div>

      <div className={styles.detailMain}>
        <div className={styles.detailHeader}>
          <div className={styles.headerTop}>
            <h1>Order Details</h1>
            <div className={styles.statusBadge + ` ${styles[booking.status]}`}>
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </div>
          </div>
          
          <div className={styles.orderInfo}>
            <div className={styles.infoItem}>
              <span className={styles.label}>Order ID:</span>
              <span className={styles.value}>#{booking._id.slice(-8).toUpperCase()}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Order Date:</span>
              <span className={styles.value}>{formatDate(booking.orderDate)}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Total Items:</span>
              <span className={styles.value}>{booking.items.length}</span>
            </div>
          </div>
        </div>

        <div className={styles.itemsSection}>
          <h2>Order Items</h2>
          <div className={styles.itemsList}>
            {booking.items.map((item, index) => (
              <div key={index} className={styles.orderItem}>
                <div className={styles.itemImage}>
                  {item.item?.picture ? (
                    <img src={item.item.picture} alt={item.item.name} />
                  ) : (
                    <div className={styles.placeholderImage}>
                      <span>No Image</span>
                    </div>
                  )}
                </div>

                <div className={styles.itemInfo}>
                  <h3 className={styles.itemName}>
                    {item.item?.name || 'Item Name Not Available'}
                  </h3>
                  {item.item?.details && (
                    <p className={styles.itemDescription}>{item.item.details}</p>
                  )}
                  <div className={styles.itemPricing}>
                    <span className={styles.unitPrice}>
                      ${item.price.toFixed(2)} each
                    </span>
                  </div>
                </div>

                <div className={styles.itemQuantity}>
                  <span className={styles.quantityLabel}>Qty:</span>
                  <span className={styles.quantityValue}>{item.quantity}</span>
                </div>

                <div className={styles.itemTotal}>
                  <span className={styles.totalLabel}>Total:</span>
                  <span className={styles.totalValue}>${calculateItemTotal(item)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.orderSummary}>
          <h2>Order Summary</h2>
          <div className={styles.summaryContent}>
            <div className={styles.summaryRow}>
              <span>Subtotal:</span>
              <span>${booking.totalAmount.toFixed(2)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Tax:</span>
              <span>$0.00</span>
            </div>
            <div className={styles.summaryRow + ` ${styles.totalRow}`}>
              <span>Total:</span>
              <span>${booking.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {booking.notes && (
          <div className={styles.notesSection}>
            <h2>Notes</h2>
            <p className={styles.notesContent}>{booking.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingDetail;
