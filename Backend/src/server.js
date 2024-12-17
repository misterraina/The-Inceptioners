// server.js
import app from './app.js';
import connectDB from './db/index.js';
import dotenv from 'dotenv';

dotenv.config();

// Connect to MongoDB
connectDB();

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
