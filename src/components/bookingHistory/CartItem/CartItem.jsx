import React from 'react';

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
    <div className="cart-item">
      <div className="item-image">
        {item.picture ? (
          <img src={item.picture} alt={item.name} />
        ) : (
          <div className="placeholder-image">
            <span>No Image</span>
          </div>
        )}
      </div>

      <div className="item-details">
        <h3 className="item-name">{item.name}</h3>
        {item.details && (
          <p className="item-description">{item.details}</p>
        )}
        <div className="item-price">
          <span className="price-label">Unit Price:</span>
          <span className="price-value">${item.price.toFixed(2)}</span>
        </div>
      </div>

      <div className="quantity-controls">
        <label className="quantity-label">Quantity:</label>
        <div className="quantity-input-group">
          <button
            className="quantity-btn minus"
            onClick={() => handleQuantityChange(-1)}
            disabled={item.quantity <= 1}
          >
            −
          </button>
          <input
            type="number"
            className="quantity-input"
            value={item.quantity}
            onChange={handleQuantityInput}
            min="1"
          />
          <button
            className="quantity-btn plus"
            onClick={() => handleQuantityChange(1)}
          >
            +
          </button>
        </div>
      </div>

      <div className="item-total">
        <div className="total-label">Total:</div>
        <div className="total-value">${itemTotal}</div>
      </div>

      <div className="item-actions">
        <button
          className="btn btn-danger btn-small"
          onClick={handleRemove}
        >
          Remove
        </button>
      </div>
        </div>
  );
};  

export default CartItem;