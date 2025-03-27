require('dotenv').config();
const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const Job = require('../models/Job'); // adjust path if needed

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('MongoDB error:', err));

// Helper to extract skill keywords from title (basic)
const extractSkillsFromTitle = title => {
  const skills = ['JavaScript', 'React', 'Node.js', 'Python', 'Ruby', 'AWS', 'Go', 'Vue', 'Django'];
  return skills.filter(skill => title.toLowerCase().includes(skill.toLowerCase()));
};

async function scrapeWeWorkRemotely() {
  try {
    const { data } = await axios.get('https://weworkremotely.com/categories/remote-programming-jobs', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    });

    const $ = cheerio.load(data);
    const jobs = [];

    $('.jobs li:not(.view-all)').each((i, el) => {
      const jobTitle = $(el).find('span.title').text().trim();
      const company = $(el).find('span.company').text().trim();
      const relativeLink = $(el).find('a').attr('href');

      if (jobTitle && company && relativeLink) {
        const url = `https://weworkremotely.com${relativeLink}`;
        const skillsRequired = extractSkillsFromTitle(jobTitle);

        jobs.push({
          title: jobTitle,
          company,
          url,
          skillsRequired,
        });
      }
    });

    console.log(`🧠 Found ${jobs.length} jobs`);

    // Save to MongoDB
    await Job.insertMany(jobs, { ordered: false });
    console.log('✅ Jobs saved to MongoDB');

  } catch (err) {
    console.error('Scraping error:', err.message);
  } finally {
    mongoose.disconnect();
  }
}

scrapeWeWorkRemotely();
