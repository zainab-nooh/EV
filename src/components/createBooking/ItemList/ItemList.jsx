import React from 'react';
import ItemCard from '../ItemCard/ItemCard';
import styles from './ItemList.module.scss';

export default function ItemList({ items, onAddToCart, cart }) {
  if (!items || items.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No items found in this category.</p>
      </div>
    );
  }

  return (
    <div className={styles.itemList}>
      {items.map((item) => (
        <ItemCard
          key={item._id}
          item={item}
          onAddToCart={onAddToCart}
          cart={cart}
        />
      ))}
    </div>
  );
}
