const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const scrapeJobs = require('./utils/jsearchScraper');

const authRoutes = require('./routes/auth');
const uploadRoutes = require('./routes/upload');
const jobRoutes = require('./routes/jobs');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/jobs', jobRoutes);

module.exports = app;

cron.schedule('0 0 * * *', async () => {
  console.log('🔁 Running job scraper at midnight');
  await scrapeJobs();
});
