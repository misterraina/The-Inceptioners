// app.js
import express from 'express';
import userRoutes from './routes/userRoutes.js'
import tourPackageRoutes from './routes/tourPackageRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import bookingRoutes from './routes/bookingRoutes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express();
app.use(cookieParser());
// Middleware
const corsOptions = {
    origin: ['http://localhost:5173'],
    credentials: true, // Allow credentials (cookies)
    allowedHeaders: ['Authorization', 'Content-Type'],
};

app.use(cors(corsOptions))
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/tour-packages', tourPackageRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/bookings', bookingRoutes);

// Export the Express app
export default app;
