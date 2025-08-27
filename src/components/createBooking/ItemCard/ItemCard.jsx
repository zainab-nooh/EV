import { useState } from 'react';
import styles from './ItemCard.module.scss';

export default function ItemCard({ item, onAddToCart, cart }) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent card click if you want to add detail view later
    if (onAddToCart) {
      onAddToCart(item);
    }
  };

  // Check if item is in cart and get quantity
  const cartItem = cart?.find(ci => ci._id === item._id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  return (
    <div className={styles.itemCard}>
      {/* Item Image */}
      <div className={styles.itemImageWrapper}>
        {item.image && !imageError ? (
          <img
            src={item.image}
            alt={item.name}
            onError={handleImageError}
            loading="lazy"
            className={styles.itemImage}
          />
        ) : (
          <div className={styles.imagePlaceholder}>
            <span className={styles.placeholderText}>No Image</span>
          </div>
        )}
      </div>

      {/* Item Information */}
      <div className={styles.itemInfo}>
        <h3 className={styles.itemName}>{item.name}</h3>
        {item.description && (
          <p className={styles.itemDescription}>{item.description}</p>
        )}
        {item.details && (
          <p className={styles.itemDetails}>{item.details}</p>
        )}
        
        {/* Price */}
        <div className={styles.itemPrice}>
          <span className={styles.priceLabel}>Price:</span>
          <span className={styles.priceValue}>${item.price?.toFixed(2) || '0.00'}</span>
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className={styles.itemActions}>
        <button 
          className={styles.addButton}
          onClick={handleAddToCart}
          disabled={!item.price}
        >
          {quantityInCart > 0 ? `Add More (${quantityInCart})` : 'Add to Cart'}
        </button>
        
        {quantityInCart > 0 && (
          <span className={styles.inCartIndicator}>
            {quantityInCart} in cart
          </span>
        )}
      </div>
    </div>
  );
}
