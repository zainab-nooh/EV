import React from 'react';
import styles from './BookingDetail.module.scss'; 

const BookingDetail = ({ booking, onReorder, formatDate, getStatusClass }) => {
  
  const calculateItemTotal = (item) => {
    return (item.price * item.quantity).toFixed(2);
  };

  const handleReorderClick = () => {
    if (onReorder) {
      onReorder(booking);
    }
  };

  return (
    <div className={styles.bookingDetail}>
      {/* Header Section */}
      <div className={styles.detailHeader}>
        <div className={styles.headerTop}>
          <h2>Event Details</h2>
          <div className={`${styles.statusBadge} ${getStatusClass(booking.status)}`}>
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </div>
        </div>
        
        <div className={styles.orderInfo}>
          <div className={styles.infoItem}>
            <span className={styles.label}>Event ID:</span>
            <span className={styles.value}>#{booking._id.slice(-8).toUpperCase()}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Event Date:</span>
            <span className={styles.value}>{formatDate(booking.orderDate)}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Total Items:</span>
            <span className={styles.value}>{booking.items.length}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Status:</span>
            <span className={styles.value}>{booking.status}</span>
          </div>
        </div>
      </div>

      {/* Items Section */}
      <div className={styles.itemsSection}>
        <h3>Event Items</h3>
        <div className={styles.itemsList}>
          {booking.items.map((bookingItem, index) => (
            <div key={index} className={styles.orderItem}>
              <div className={styles.itemImage}>
                {bookingItem.item?.picture || bookingItem.item?.image ? (
                  <img 
                    src={bookingItem.item.picture || bookingItem.item.picture} 
                    alt={bookingItem.item.name}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className={styles.placeholderImage} style={{ 
                  display: (bookingItem.item?.picture || bookingItem.item?.image) ? 'none' : 'flex' 
                }}>
                  <span>No Image</span>
                </div>
              </div>

              <div className={styles.itemInfo}>
                <h4 className={styles.itemName}>
                  {bookingItem.item?.name || 'Item Name'}
                </h4>
                {bookingItem.item?.description && (
                  <p className={styles.itemDescription}>{bookingItem.item.description}</p>
                )}
                {bookingItem.item?.details && (
                  <p className={styles.itemDetails}>{bookingItem.item.details}</p>
                )}
              </div>

              <div className={styles.itemPricing}>
                <div className={styles.priceRow}>
                  <span className={styles.priceLabel}>Unit Price:</span>
                  <span className={styles.priceValue}>${bookingItem.price.toFixed(2)}</span>
                </div>
                <div className={styles.quantityRow}>
                  <span className={styles.quantityLabel}>Quantity:</span>
                  <span className={styles.quantityValue}>{bookingItem.quantity}</span>
                </div>
                <div className={styles.totalRow}>
                  <span className={styles.totalLabel}>Total:</span>
                  <span className={styles.totalValue}>${calculateItemTotal(bookingItem)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className={styles.orderSummary}>
        <h3>Event Summary</h3>
        <div className={styles.summaryContent}>
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Items Subtotal:</span>
            <span className={styles.summaryValue}>${booking.totalAmount.toFixed(2)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Tax & Fees:</span>
            <span className={styles.summaryValue}>$0.00</span>
          </div>
          <div className={`${styles.summaryRow} ${styles.totalRow}`}>
            <span className={styles.summaryLabel}>Event Total:</span>
            <span className={styles.summaryValue}>${booking.totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Notes Section */}
      {booking.notes && (
        <div className={styles.notesSection}>
          <h3>Event Notes</h3>
          <div className={styles.notesContent}>
            <p>{booking.notes}</p>
          </div>
        </div>
      )}

      {/* Actions Section */}
      <div className={styles.actionsSection}>
        <button 
          className={styles.reorderBtn}
          onClick={handleReorderClick}
          title="Add all items from this event to your current cart"
        >
          Reorder This Event
        </button>
        
        <div className={styles.actionHint}>
          <p>Click "Reorder" to add all these items to your cart for a new event</p>
        </div>
      </div>
    </div>
  );
};

export default BookingDetail;
