import express from 'express';
import usersCtrl from '../controllers/user.controller.js';

const router = express.Router();

// Get All Users
router.get('/', usersCtrl.getAllUsers);

// Get User by Id
router.get('/:id', usersCtrl.getUserById);

// Create user
router.post('/', usersCtrl.createUser);

// User put call
router.put('/:id', usersCtrl.updateUser);

// Delete user by id
router.delete('/:id', usersCtrl.deleteUserById);

// Delete all user
router.delete('/', usersCtrl.deleteAllUsers);

export default router;