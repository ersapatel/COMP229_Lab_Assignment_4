import express from 'express';
import contactsCtrl from '../controllers/contact.controller.js';

const router = express.Router();

// Get all contacts
router.get('/', contactsCtrl.getAllContacts);

// get contact by id
router.get('/:id', contactsCtrl.getContactById);

// Create new contact
router.post('/', contactsCtrl.createContact);

// Contact put call
router.put('/:id', contactsCtrl.updateContact);

// Delete contact by id
router.delete('/:id', contactsCtrl.deleteContactById);

// Delete all contacts
router.delete('/', contactsCtrl.deleteAllContacts);

export default router;