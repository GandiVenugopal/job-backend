const Job = require('../models/Job');
const User = require('../models/User');

exports.getRecommendedJobs = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user.skills || user.skills.length === 0) {
      return res.status(400).json({ message: 'No skills found for user. Upload a resume first.' });
    }

    const jobs = await Job.find();
    const matchedJobs = jobs.filter(job =>
      job.skillsRequired.some(skill => user.skills.includes(skill))
    );

    res.json(matchedJobs);
  } catch (err) {
    console.error('Error getting job recommendations:', err);
    res.status(500).json({ message: 'Failed to fetch job recommendations' });
  }
};
