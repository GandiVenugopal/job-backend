require('dotenv').config();
const axios = require('axios');
const mongoose = require('mongoose');
const Job = require('../models/Job');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('MongoDB error:', err));

const extractSkillsFromText = (text) => {
  const SKILLS = ['JavaScript', 'React', 'Node.js', 'Python', 'Java', 'AWS', 'SQL', 'Django', 'MongoDB', 'C++', 'Vue'];
  return SKILLS.filter(skill => text.toLowerCase().includes(skill.toLowerCase()));
};

async function fetchRemotiveJobs() {
  try {
    const { data } = await axios.get('https://remotive.io/api/remote-jobs?category=software-dev', {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    'Accept': 'application/json'
  }
});

    const jobs = data.jobs.map(job => ({
      title: job.title,
      company: job.company_name,
      url: job.url,
      skillsRequired: extractSkillsFromText(job.description)
    }));

    console.log(`🧠 Found ${jobs.length} jobs`);

    await Job.insertMany(jobs, { ordered: false });
    console.log('✅ Jobs saved to MongoDB');
  } catch (err) {
    console.error('Scraper error:', err.message);
  } finally {
    mongoose.disconnect();
  }
}

fetchRemotiveJobs();
