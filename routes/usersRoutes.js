import express from 'express';
import usersCtrl from '../controllers/user.controller.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Login route (no auth)
router.post('/login', usersCtrl.loginUser);

// Protected: Get all users
router.get('/', authMiddleware, usersCtrl.getAllUsers);

// Protected: Get user by Id
router.get('/:id', authMiddleware, usersCtrl.getUserById);

// Create user (register)
router.post('/', usersCtrl.createUser);

// Update user
router.put('/:id', usersCtrl.updateUser);

// Protected: Delete user by id
router.delete('/:id', authMiddleware, usersCtrl.deleteUserById);

// Protected: Delete all users
router.delete('/', authMiddleware, usersCtrl.deleteAllUsers);

export default router;
