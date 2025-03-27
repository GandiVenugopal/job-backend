const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/multerMiddleware');
const { uploadResume } = require('../controllers/uploadController');

router.post('/resume', auth, upload.single('resume'), uploadResume);

module.exports = router;
