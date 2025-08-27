import Booking from '../models/Booking.js';

export {
  createBooking,
  getUserBookings,
  getBookingById,
  updateBookingStatus,
  deleteBooking
};

// Create a new booking (replaces the old cart-based checkout)
async function createBooking(req, res) {
  try {
    const { items, totalAmount, notes } = req.body;
    
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Items array is required and cannot be empty' 
      });
    }

    // Create new booking
    const newBooking = new Booking({
      user: req.user._id,
      items: items.map(item => ({
        item: item.item,
        quantity: item.quantity,
        price: item.price
      })),
      totalAmount: totalAmount,
      notes: notes || '',
      status: 'confirmed', // Auto-confirm for now
      orderDate: new Date()
    });

    await newBooking.save();

    // Populate the item details for the response
    await newBooking.populate('items.item');

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      booking: newBooking
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create booking',
      error: error.message 
    });
  }
}

// Get all bookings for the current user
async function getUserBookings(req, res) {
  try {
    const bookings = await Booking
      .find({ user: req.user._id })
      .populate('items.item')
      .sort({ orderDate: -1 })
      .exec();

    res.status(200).json(bookings);
  } catch (error) {
    console.error('Get user bookings error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch booking history',
      error: error.message 
    });
  }
}

// Get a specific booking by ID
async function getBookingById(req, res) {
  try {
    const booking = await Booking
      .findOne({ 
        _id: req.params.id, 
        user: req.user._id 
      })
      .populate('items.item')
      .exec();

    if (!booking) {
      return res.status(404).json({ 
        success: false, 
        message: 'Booking not found' 
      });
    }

    res.status(200).json({
      success: true,
      booking
    });
  } catch (error) {
    console.error('Get booking by ID error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch booking',
      error: error.message 
    });
  }
}

// Update booking status
async function updateBookingStatus(req, res) {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid status. Must be one of: ' + validStatuses.join(', ')
      });
    }

    const booking = await Booking
      .findOneAndUpdate(
        { _id: req.params.id, user: req.user._id },
        { status },
        { new: true }
      )
      .populate('items.item')
      .exec();

    if (!booking) {
      return res.status(404).json({ 
        success: false, 
        message: 'Booking not found' 
      });
    }

    res.status(200).json({
      success: true,
      message: 'Booking status updated successfully',
      booking
    });
  } catch (error) {
    console.error('Update booking status error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update booking status',
      error: error.message 
    });
  }
}

// Delete a booking (soft delete by changing status)
async function deleteBooking(req, res) {
  try {
    const booking = await Booking
      .findOneAndUpdate(
        { _id: req.params.id, user: req.user._id },
        { status: 'cancelled' },
        { new: true }
      )
      .populate('items.item')
      .exec();

    if (!booking) {
      return res.status(404).json({ 
        success: false, 
        message: 'Booking not found' 
      });
    }

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully',
      booking
    });
  } catch (error) {
    console.error('Delete booking error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to cancel booking',
      error: error.message 
    });
  }
}

// Legacy functions for backward compatibility (if needed)
export async function cart(req, res) {
  res.status(400).json({ 
    success: false, 
    message: 'Cart functionality has been replaced with direct booking creation' 
  });
}

export async function addToCart(req, res) {
  res.status(400).json({ 
    success: false, 
    message: 'Cart functionality has been replaced with direct booking creation' 
  });
}

export async function setItemQtyInCart(req, res) {
  res.status(400).json({ 
    success: false, 
    message: 'Cart functionality has been replaced with direct booking creation' 
  });
}

export async function checkout(req, res) {
  res.status(400).json({ 
    success: false, 
    message: 'Use POST /api/bookings to create bookings directly' 
  });
}

export async function history(req, res) {
  // Redirect to the new getUserBookings function
  return getUserBookings(req, res);
}
