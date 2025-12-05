import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import contactsRoutes from './routes/contactsRoutes.js';
import usersRoutes from './routes/usersRoutes.js';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/Lab_Assignment_4', {
 useNewUrlParser: true,
 useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
 console.log('Connected to MongoDB');
});

app.get('/', (req, res) => {
    res.send('Welcome to Portfolio Application');
});

app.use('/api/users', usersRoutes);
app.use('/api/contacts', contactsRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));