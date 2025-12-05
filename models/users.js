import mongoose from 'mongoose';

const ItemsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  created: { type: Date, required: true },
  updated: { type: Date, required: true }
});

const Users = mongoose.model('Users', ItemsSchema);

export default Users;
