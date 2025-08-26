import React from 'react';
import style from "./CartItem.module.scss";

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const handleQuantityChange = (change) => {
    const newQuantity = item.quantity + change;
    if (newQuantity >= 1) {
      onUpdateQuantity(item._id, newQuantity);
    }
  };

  const handleQuantityInput = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      onUpdateQuantity(item._id, newQuantity);
    }
  };

  const handleRemove = () => {
    if (window.confirm('Are you sure you want to remove this item from your cart?')) {
      onRemove(item._id);
    }
  };

  const itemTotal = (item.price * item.quantity).toFixed(2);

  return (
    <div className={style.cartItem}>
      <div className={style.itemImage}>
        {item.picture ? (
          <img src={item.picture} alt={item.name} />
        ) : (
          <div className={style.placeholderImage}>
            <span>No Image</span>
          </div>
        )}
      </div>

      <div className={style.itemDetails}>
        <h3 className={style.itemName}>{item.name}</h3>
        {item.details && (
          <p className={style.itemDescription}>{item.details}</p>
        )}
        <div className={style.itemPrice}>
          <span className={style.priceLabel}>Unit Price:</span>
          <span className={style.priceValue}>${item.price.toFixed(2)}</span>
        </div>
      </div>

      <div className={style.quantityControls}>
        <label className={style.quantityLabel}>Quantity:</label>
        <div className={style.quantityInputGroup}>
          <button
            className={`${style.quantityBtn} ${style.minus}`}
            onClick={() => handleQuantityChange(-1)}
            disabled={item.quantity <= 1}
          >
            −
          </button>
          <input
            type="number"
            className={style.quantityInput}
            value={item.quantity}
            onChange={handleQuantityInput}
            min="1"
          />
          <button
            className={`${style.quantityBtn} ${style.plus}`}
            onClick={() => handleQuantityChange(1)}
          >
            +
          </button>
        </div>
      </div>

      <div className={style.itemTotal}>
        <div className={style.totalLabel}>Total:</div>
        <div className={style.totalValue}>${itemTotal}</div>
      </div>

      <div className={style.itemActions}>
        <button
          className={`${style.btn} ${style.btnDanger} ${style.btnSmall}`}
          onClick={handleRemove}
        >
          Remove
        </button>
      </div>
    </div>
  );
};  

export default CartItem;