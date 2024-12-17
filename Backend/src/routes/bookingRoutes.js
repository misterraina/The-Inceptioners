import express from 'express';
import {
  bookPackage,
  getAllBookings,
  getBookingsByUser,
  cancelBooking,
} from '../controllers/bookingController.js';

const router = express.Router();

// Book a package
router.post('/', bookPackage);

// Get all bookings
router.get('/', getAllBookings);

// Get bookings by user ID
router.get('/user/:userId', getBookingsByUser);

// Cancel a booking
router.delete('/:id', cancelBooking);

export default router;
