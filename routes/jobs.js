const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const { getRecommendedJobs } = require('../controllers/jobController');

// Authenticated route
router.get('/recommendations', auth, getRecommendedJobs);

module.exports = router;

router.post('/seed', async (req, res) => {
  const Job = require('../models/Job');

  await Job.insertMany([
    {
      title: "Frontend Developer",
      company: "TechDev",
      skillsRequired: ["React", "JavaScript", "HTML", "CSS"]
    },
    {
      title: "Cloud Engineer",
      company: "AWS Cloud",
      skillsRequired: ["AWS", "Linux", "Networking"]
    },
    {
      title: "Full Stack Developer",
      company: "DevWorks",
      skillsRequired: ["JavaScript", "Node.js", "MongoDB", "React"]
    }
  ]);

  res.json({ message: 'Jobs seeded successfully' });
});
