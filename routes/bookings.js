import express from 'express';
import { 
  createBooking,
  getUserBookings, 
  getBookingById,
  updateBookingStatus,
  deleteBooking,
  // Legacy functions for backward compatibility
  cart,
  addToCart,
  setItemQtyInCart,
  checkout,
  history
} from '../controllers/bookingController.js';

const router = express.Router();

// New booking system routes
router.post('/', createBooking);                    // POST /api/bookings - Create new booking
router.get('/history', getUserBookings);            // GET /api/bookings/history - Get user's bookings
router.get('/:id', getBookingById);                 // GET /api/bookings/:id - Get specific booking
router.put('/:id/status', updateBookingStatus);     // PUT /api/bookings/:id/status - Update booking status
router.delete('/:id', deleteBooking);               // DELETE /api/bookings/:id - Cancel booking

// Legacy cart-based routes (for backward compatibility)
router.get('/cart', cart);                          // Deprecated - returns error message
router.post('/cart/items/:id', addToCart);          // Deprecated - returns error message
router.put('/cart/qty', setItemQtyInCart);          // Deprecated - returns error message  
router.post('/cart/checkout', checkout);            // Deprecated - returns error message

export default router;
