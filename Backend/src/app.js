// app.js
import express from 'express';
import userRoutes from './routes/userRoutes.js'
import tourPackageRoutes from './routes/tourPackageRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import bookingRoutes from './routes/bookingRoutes.js'

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/tour-packages', tourPackageRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/bookings', bookingRoutes);

// Export the Express app
export default app;
