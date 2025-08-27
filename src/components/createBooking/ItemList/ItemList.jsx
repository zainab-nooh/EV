import React from "react";
import ItemCard from "../ItemCard/ItemCard";
import styles from "./ItemList.module.scss";

const ItemList = ({ items, onAddToCart }) => {
  if (!items || items.length === 0)
    return <p className={styles["item-list"]}>No items found.</p>;

  return (
    <div className={styles["item-list"]}>
      {items.map((item) => (
        <ItemCard key={item._id} item={item} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
};

export default ItemList;
