import mongoose from 'mongoose';

const ItemsSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true}
});

const Contacts = mongoose.model('Contacts', ItemsSchema);
export default Contacts;