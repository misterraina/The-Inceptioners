import TourPackage from '../models/TourPackage.js';

// Get all tour packages
export const getAllTourPackages = async (req, res) => {
  try {
    const tourPackages = await TourPackage.find();
    res.status(200).json(tourPackages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tour packages', error });
  }
};

// Get a single tour package by ID
export const getTourPackageById = async (req, res) => {
  try {
    const { id } = req.params;
    const tourPackage = await TourPackage.findById(id);

    if (!tourPackage) {
      return res.status(404).json({ message: 'Tour package not found' });
    }

    res.status(200).json(tourPackage);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching the tour package', error });
  }
};

// Create a new tour package
export const createTourPackage = async (req, res) => {
  try {
    const { title, description, price, availableDates, image } = req.body;
    const newTourPackage = new TourPackage({ title, description, price, availableDates, image });

    await newTourPackage.save();
    res.status(201).json(newTourPackage);
  } catch (error) {
    res.status(500).json({ message: 'Error creating tour package', error });
  }
};

// Update a tour package
export const updateTourPackage = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTourPackage = await TourPackage.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true } // Return the updated document
    );

    if (!updatedTourPackage) {
      return res.status(404).json({ message: 'Tour package not found' });
    }

    res.status(200).json(updatedTourPackage);
  } catch (error) {
    res.status(500).json({ message: 'Error updating the tour package', error });
  }
};

// Delete a tour package
export const deleteTourPackage = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTourPackage = await TourPackage.findByIdAndDelete(id);

    if (!deletedTourPackage) {
      return res.status(404).json({ message: 'Tour package not found' });
    }

    res.status(200).json({ message: 'Tour package deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting the tour package', error });
  }
};
