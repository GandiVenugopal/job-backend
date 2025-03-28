require('dotenv').config();
const axios = require('axios');
const mongoose = require('mongoose');
const Job = require('../models/Job');

if (process.env.NODE_ENV !== 'production') {
  mongoose.connect(process.env.MONGO_URI)
      .then(() => console.log('✅ Connected to MongoDB'))
      .catch(err => console.error('MongoDB error:', err));
}

const extractSkillsFromText = (text) => {
  const SKILLS = ['JavaScript', 'React', 'Node.js', 'Python', 'Java', 'AWS', 'SQL', 'Django', 'MongoDB', 'C++', 'Vue'];
  return SKILLS.filter(skill => text.toLowerCase().includes(skill.toLowerCase()));
};

async function fetchJobsFromJSearch() {
  try {
    const response = await axios.get('https://jsearch.p.rapidapi.com/search', {
      params: {
        query: 'software developer remote',
        page: '1',
        num_pages: '1'
      },
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
      }
    });

    const jobs = response.data.data.map(job => ({
      title: job.job_title,
      company: job.employer_name,
      url: job.job_apply_link || job.job_google_link,
      skillsRequired: extractSkillsFromText(job.job_description || '')
    }));

    console.log(`🧠 Found ${jobs.length} jobs`);

    await Job.insertMany(jobs, { ordered: false });
    console.log('✅ Jobs saved to MongoDB');

  } catch (err) {
    console.error('❌ Scraper error:', err.message);
  } finally {
    mongoose.disconnect();
  }
}

fetchJobsFromJSearch();
