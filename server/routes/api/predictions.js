const express = require('express');
const router = express.Router();
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const auth = require('../../middleware/auth');
const User = require('../../models/User');
const { predictDisease } = require('../../utils/predict'); // ML model
const { generatePDF } = require('../../utils/pdf');        // PDF generator

// Multer: store in memory, then process with sharp
const storage = multer.memoryStorage();
const upload = multer({ storage });

// @route   POST api/predictions
// @desc    Run ML prediction, save record on user, generate PDF report
// @access  Private
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    // 1. validate file
    if (!req.file) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }

    // 2. save preprocessed image to /uploads
    const imageFilename = `${uuidv4()}.jpg`;
    const uploadsDir = path.join(__dirname, '../../uploads');
    if (!require('fs').existsSync(uploadsDir)) {
      require('fs').mkdirSync(uploadsDir, { recursive: true });
    }
    const imagePath = path.join(uploadsDir, imageFilename);

    await sharp(req.file.buffer).resize(224, 224).toFile(imagePath);

    // 3. run model prediction (adds record to user and returns { prediction, precautions })
    const result = await predictDisease(imagePath, req.user.id);

    if (!result || !result.prediction) {
      return res
        .status(500)
        .json({ msg: 'Prediction could not be generated' });
    }

    const { prediction, precautions } = result;

    // 4. get user + last record (created by predictDisease)
    const user = await User.findById(req.user.id);
    if (!user || !user.records || user.records.length === 0) {
      return res
        .status(500)
        .json({ msg: 'Prediction record not found for user' });
    }

    const lastRecord = user.records[user.records.length - 1];

    // Build clean record object for PDF
    const record = {
      prediction: prediction,
      precautions: precautions || [],
      imagePath: lastRecord.imagePath || null,
      date: lastRecord.date || new Date()
    };

    // 5. generate PDF report and get filename
    const pdfFilename = await generatePDF(user, record);

    // 6. send response
    return res.json({
      prediction,
      precautions,
      imagePath: record.imagePath,
      pdfFilename
    });
  } catch (err) {
    console.error('Prediction route error:', err);
    return res
      .status(500)
      .json({ msg: 'Server error while generating prediction' });
  }
});

module.exports = router;
