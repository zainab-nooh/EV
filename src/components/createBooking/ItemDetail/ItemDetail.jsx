import React from "react";
import styles from "./ItemDetail.scss";

const ItemDetail = ({ item, onAddToCart }) => {
  if (!item) return <p>Loading item details...</p>;

  return (
    <div className={styles.ItemDetail}>
      <img
        src={item.image || "/default-item.png"}
        alt={item.name}
        className="item-detail__image"
      />
      <div className="item-detail__info">
        <h2>{item.name}</h2>
        <p>{item.description}</p>
        <p className="item-detail__price">${item.price?.toFixed(2)}</p>
        <button
          className="btn btn-primary"
          onClick={() => onAddToCart(item)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ItemDetail;
