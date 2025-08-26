import { useNavigate } from 'react-router-dom';
import styles from './CategoryCard.module.scss';

const CategoryCard = ({ category, onClick }) => {
  const navigate = useNavigate();

  // ✅ Defensive check to avoid crashing
  if (!category || !category.name) return null;

  const handleClick = () => {
    if (onClick) {
      onClick(category);
    } else {
      navigate(`/create-booking?category=${category._id}`);
    }
  };

  return (
    <div className={styles.categoryCard} onClick={handleClick}>
      <div className={styles.categoryContent}>

        <div className={styles.categoryIcon}>
          <span className={styles.iconPlaceholder}>
            {category.name.charAt(0).toUpperCase()}
          </span>
        </div>

        <div className={styles.categoryInfo}>
          <h3 className={styles.categoryName}>{category.name}</h3>
          <span className={styles.categoryLabel}>Browse Items</span>
        </div>

      </div>

      <div className={styles.arrow}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path 
            d="M6 12L10 8L6 4" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default CategoryCard;
