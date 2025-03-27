const s3 = require('../config/s3');
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const extractSkills = require('../utils/skillExtractor');
const User = require('../models/User');

const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

exports.uploadResume = async (req, res) => {
  const userId = req.user.id;
  const file = req.file;

  // Upload to AWS S3
  const s3Params = {
    Bucket: process.env.S3_BUCKET,
    Key: `${Date.now()}_${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    await s3.send(new PutObjectCommand(s3Params));
  } catch (err) {
    console.error('S3 upload error:', err);
    return res.status(500).json({ message: 'Failed to upload resume to S3' });
  }

  // Extract text and skills
  try {
    let text = '';

    if (file.mimetype === 'application/pdf') {
      const parsed = await pdfParse(file.buffer);
      text = parsed.text;

    } else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const result = await mammoth.extractRawText({ buffer: file.buffer });
      text = result.value;

    } else {
      return res.status(400).json({ message: 'Only PDF and DOCX files are supported' });
    }

    const skills = extractSkills(text);

    await User.findByIdAndUpdate(userId, { skills });

    res.json({ message: 'Resume uploaded and skills extracted', skills });

  } catch (err) {
    console.error('Skill extraction error:', err);
    res.status(500).json({ message: 'Failed to extract skills from resume' });
  }
};
