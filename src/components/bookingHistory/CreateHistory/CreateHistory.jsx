import React, { useState } from 'react';
import style from "./CreateHistory.module.scss";  

const CreateHistory = ({ onCreateBooking, onCancel }) => {
  const [formData, setFormData] = useState({
    items: [],
    notes: '',
    status: 'pending'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.items.length === 0) {
      setError('Please add at least one item to the booking');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Calculate total amount
      const totalAmount = formData.items.reduce((total, item) => {
        return total + (item.price * item.quantity);
      }, 0);

      const bookingData = {
        ...formData,
        totalAmount
      };

      if (onCreateBooking) {
        await onCreateBooking(bookingData);
      }
    } catch (err) {
      setError(err.message || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.createHistory}>
      <div className={style.createHistoryContainer}>
        <div className={style.createHistoryHeader}>
          <h2>Create Manual Booking</h2>
          <p>Add booking details manually to the system</p>
        </div>

        {error && (
          <div className={style.errorMessage}>
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className={style.createHistoryForm}>
          <div className={style.formGroup}>
            <label htmlFor="status">Booking Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className={style.formControl}
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className={style.formGroup}>
            <label htmlFor="notes">Notes (Optional)</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              className={style.formControl}
              rows="4"
              placeholder="Add any additional notes about this booking..."
            />
          </div>

          <div className={style.itemsSection}>
            <h3>Booking Items</h3>
            <p className={style.itemsNote}>
              Note: This is a simplified form. In a full implementation, you would
              typically select items from your inventory and specify quantities.
            </p>
            
            <div className={style.itemsPlaceholder}>
              <div className={style.placeholderContent}>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect x="8" y="12" width="32" height="24" rx="2" stroke="#ccc" strokeWidth="2"/>
                  <path d="M16 20h16M16 26h12M16 32h20" stroke="#ccc" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <p>Items would be added here</p>
                <small>In the full system, you'd select from available inventory</small>
              </div>
            </div>
          </div>

          <div className={style.formActions}>
            <button
              type="button"
              onClick={onCancel}
              className={`${style.btn} ${style.btnSecondary}`}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`${style.btn} ${style.btnPrimary}`}
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Booking'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateHistory;