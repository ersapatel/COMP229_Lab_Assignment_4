import Users from '../models/users.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'my_jwt_secret_key';

// GET all
const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET by ID
const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Users.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Create new
const createUser = async (req, res) => {
  try {
    const newUser = new Users(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update
const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUser = await Users.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete by ID
const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedUser = await Users.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(deletedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete all users
const deleteAllUsers = async (req, res) => {
  try {
    const deletedAllUsers = await Users.deleteMany({});
    res.json(deletedAllUsers);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// LOGIN: issue JWT token (email + password)
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user by email
    const user = await Users.findOne({ email });

    // Very basic auth (no hashing)
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Token payload
    const payload = {
      userId: user._id,
      email: user.email
    };

    // Sign token (1 hour expiry)
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    res.json({
      message: 'Login successful',
      token
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUserById,
  deleteAllUsers,
  loginUser
};
