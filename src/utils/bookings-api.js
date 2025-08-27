import sendRequest from './send-request';

const BASE_URL = '/api/bookings';

// Create a new booking (replaces checkout)
export function createBooking(bookingData) {
  return sendRequest(BASE_URL, 'POST', bookingData);
}

// Get user's booking history
export function getBookingHistory() {
  return sendRequest(`${BASE_URL}/history`);
}

// Get a specific booking by ID
export function getBookingById(bookingId) {
  return sendRequest(`${BASE_URL}/${bookingId}`);
}

// Update booking status
export function updateBookingStatus(bookingId, status) {
  return sendRequest(`${BASE_URL}/${bookingId}/status`, 'PUT', { status });
}

// Cancel a booking
export function cancelBooking(bookingId) {
  return sendRequest(`${BASE_URL}/${bookingId}`, 'DELETE');
}

// Legacy functions (deprecated - will return errors from server)
export function getCart() {
  return sendRequest(`${BASE_URL}/cart`);
}

export function addItemToCart(itemId) {
  return sendRequest(`${BASE_URL}/cart/items/${itemId}`, 'POST');
}

export function setItemQtyInCart(itemId, newQty) {
  return sendRequest(`${BASE_URL}/cart/qty`, 'PUT', { itemId, newQty });
}

export function checkout() {
  return sendRequest(`${BASE_URL}/cart/checkout`, 'POST');
}

// Alias for backward compatibility
export function getOrderHistory() {
  return getBookingHistory();
}
