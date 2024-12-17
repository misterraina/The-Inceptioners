import Admin from '../models/Admin.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register Admin
export const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the admin count exceeds 3
    const adminCount = await Admin.countDocuments();
    if (adminCount >= 3) {
      return res.status(403).json({ message: 'Admin registration limit reached. Cannot register more than 3 admins.' });
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const newAdmin = new Admin({ name, email, password: hashedPassword });
    await newAdmin.save();

    // Generate JWT
    const token = jwt.sign({ id: newAdmin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({
      message: 'Admin registered successfully.',
      admin: { id: newAdmin._id, name: newAdmin.name, email: newAdmin.email },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.', error: error.message });
  }
};

// Login Admin
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found.' });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Generate JWT
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({
      message: 'Login successful.',
      admin: { id: admin._id, name: admin.name, email: admin.email },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.', error: error.message });
  }
};

// Verify Token
export const verifyToken = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ message: 'Token is valid.', userId: decoded.id });
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token.', error: error.message });
  }
};

// Logout Admin
export const logoutAdmin = async (req, res) => {
  try {
    // Clear the token on the client side (not handled server-side in stateless JWT)
    res.status(200).json({ message: 'Logout successful.' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.', error: error.message });
  }
};
