import mongoose from 'mongoose';

const tourPackageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  availableDates: {
    type: [Date],
    required: true,
  },
  image: {
    type: String, // URL or path to the image
    required: true,
  },
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt
});

const TourPackage = mongoose.model('TourPackage', tourPackageSchema);
export default TourPackage;
