const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: String,
  company: String,
  skillsRequired: [String],
});

module.exports = mongoose.model('Job', JobSchema);
const Job = require('../models/Job');