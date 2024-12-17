import express from 'express';
import {
  getAllTourPackages,
  getTourPackageById,
  createTourPackage,
  updateTourPackage,
  deleteTourPackage,
} from '../controllers/tourPackageController.js';

const router = express.Router();

// Routes
router.get('/', getAllTourPackages); // Get all packages
router.get('/:id', getTourPackageById); // Get package by ID
router.post('/', createTourPackage); // Create a new package
router.put('/:id', updateTourPackage); // Update an existing package
router.delete('/:id', deleteTourPackage); // Delete a package

export default router;
