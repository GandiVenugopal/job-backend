const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch(err => console.error(err));

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