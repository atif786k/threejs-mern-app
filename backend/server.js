const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const objectRoutes = require('./routes/objectRoutes');

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:5173', credentials: true, optionsSuccessStatus: 200 }));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlparser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected")).catch((error) => console.error("MongoDB connection error:", error));

app.use('/api/auth', authRoutes);
app.use('/api/objects', objectRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the 3D Viewer App backend');
})

app.listen(PORT, (req, res) => {
    console.log(`Server is running on http://localhost:${PORT}`);
})