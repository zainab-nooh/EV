import React from "react";

const ItemCard = ({ item, onAddToCart }) => {
  return (
    <div className="item-card">
      <img
        src={item.image || "/default-item.png"}
        alt={item.name}
        className="item-card__image"
      />
      <div className="item-card__info">
        <h4 className="item-card__name">{item.name}</h4>
        <p className="item-card__description">{item.description}</p>
        <p className="item-card__price">${item.price?.toFixed(2)}</p>
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

export default ItemCard;
