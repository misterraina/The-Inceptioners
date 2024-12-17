import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  tourPackage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TourPackage', // Reference to the TourPackage model
    required: true,
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
  numberOfPeople: {
    type: Number,
    required: true,
    min: 1,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
