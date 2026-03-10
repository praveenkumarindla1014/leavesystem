const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const authRoutes = require('./routes/authRoutes');
const leaveRoutes = require('./routes/leaveRoutes');

const app = express();

// ───── Middleware ─────
app.use(cors());
app.use(express.json());

// ───── Routes ─────
app.get('/', (req, res) => {
  res.json({ message: 'Leave Management System API is running 🚀' });
});

app.use('/api/auth', authRoutes);
app.use('/api/leaves', leaveRoutes);

// ───── Global Error Handler ─────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// ───── Database Connection & Server Start ─────
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });
