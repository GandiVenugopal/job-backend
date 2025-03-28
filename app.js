const express = require('express');
const cors = require('cors');
const cron = require('node-cron');

const authRoutes = require('./routes/auth');
const uploadRoutes = require('./routes/upload');
const jobRoutes = require('./routes/jobs');

const app = express();

// ✅ CORS config for secure frontend access
const allowedOrigins = [
  'https://job-frontend-beige.vercel.app',
  'http://localhost:3000'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/jobs', jobRoutes);

module.exports = app;

// ✅ Schedule scraping only in production, and avoid re-importing
if (process.env.NODE_ENV === 'production') {
  const scrapeJobs = require('./utils/jsearchScraper');
  cron.schedule('0 0 * * *', async () => {
    console.log('🔁 Running job scraper at midnight');
    await scrapeJobs();
  });
}
