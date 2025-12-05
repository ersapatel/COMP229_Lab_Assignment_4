import express from 'express';
import contactsCtrl from '../controllers/contact.controller.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all contacts (protected)
router.get('/', authMiddleware, contactsCtrl.getAllContacts);

// Get contact by id (protected)
router.get('/:id', authMiddleware, contactsCtrl.getContactById);

// Create new contact
router.post('/', contactsCtrl.createContact);

// Update contact
router.put('/:id', contactsCtrl.updateContact);

// Delete contact by id (protected)
router.delete('/:id', authMiddleware, contactsCtrl.deleteContactById);

// Delete all contacts (protected)
router.delete('/', authMiddleware, contactsCtrl.deleteAllContacts);

export default router;
