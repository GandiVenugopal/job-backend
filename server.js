require('dotenv').config();
const mongoose = require('mongoose');

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ MongoDB connected');

    // ✅ Import the app *AFTER* connection is confirmed
    const app = require('./app');
    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err);
    process.exit(1);
  }
};

startServer();


const cors = require('cors');

// Allow your Vercel frontend
const allowedOrigins = [
  'https://job-frontend-beige.vercel.app', // frontend URL
  'http://localhost:3000' // for local url
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));