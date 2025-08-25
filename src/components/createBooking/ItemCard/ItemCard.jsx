import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ItemCard.module.scss';

export default function ItemCard({ item }) {
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/items/${item._id}`); 
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className={styles.itemCard} onClick={handleClick}>
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

      <div className={styles.itemInfo}>
        <h3 className={styles.itemName}>{item.name}</h3>
        {item.description && (
          <p className={styles.itemDescription}>{item.description}</p>
        )}
      </div>
    </div>
  );
}
