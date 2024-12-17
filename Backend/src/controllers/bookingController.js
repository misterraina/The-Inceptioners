import Booking from '../models/Booking.js';
import TourPackage from '../models/TourPackage.js';
import User from '../models/User.js';

// Book a package
export const bookPackage = async (req, res) => {
  try {
    const { userId, tourPackageId, numberOfPeople } = req.body;

    // Validate user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate tour package
    const tourPackage = await TourPackage.findById(tourPackageId);
    if (!tourPackage) {
      return res.status(404).json({ message: 'Tour package not found' });
    }

    // Calculate total price
    const totalPrice = tourPackage.price * numberOfPeople;

    // Create booking
    const booking = new Booking({
      user: userId,
      tourPackage: tourPackageId,
      numberOfPeople,
      totalPrice,
    });

    await booking.save();

    res.status(201).json({
      message: 'Package booked successfully',
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error booking the package', error });
  }
};

// Get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email')
      .populate('tourPackage', 'title price');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error });
  }
};

// Get bookings by user
export const getBookingsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const bookings = await Booking.find({ user: userId })
      .populate('tourPackage', 'title price availableDates');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error });
  }
};

// Cancel a booking
export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByIdAndDelete(id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling booking', error });
  }
};
