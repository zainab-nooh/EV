import React from 'react';
import styles from './CategoryCard.module.scss';
export default function CategoryCard({ item: category, isSelected, onSelect }) {
  const handleClick = () => {
    if (onSelect) {
      onSelect(category);
    }
  };
  return (
    <div
      className={`${styles.categoryCard} ${isSelected ? styles.selected : ''}`}
      onClick={handleClick}
    >
      <div className={styles.categoryImageWrapper}>
        {category.image ? (
          // <img
          //   src={category.image}
          //   alt={category.name}
          //   className={styles.categoryImage}
          // />
          <p></p>
        ) : (
          <div className={styles.imagePlaceholder}>
            <span className={styles.placeholderText}></span>
          </div>
        )}
      </div>
      <div className={styles.categoryInfo}>
        <h3 className={styles.categoryName}>{category.name}</h3>
        {category.description && (
          <p className={styles.categoryDescription}>{category.description}</p>
        )}
      </div>
      {isSelected && (
        <div className={styles.selectedIndicator}>
          ✓
        </div>
      )}
    </div>
  );
}