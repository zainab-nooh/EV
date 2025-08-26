import React from "react";
import ItemCard from "../ItemCard/ItemCard";

const ItemList = ({ items, onAddToCart }) => {
  if (!items || items.length === 0) return <p>No items found.</p>;

  return (
    <div className="item-list">
      {items.map((item) => (
        <ItemCard
          key={item._id}
          item={item}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

export default ItemList;
