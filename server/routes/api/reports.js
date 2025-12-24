const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// GET /api/reports - list all PDF reports in the /reports directory
router.get('/', (req, res) => {
  const reportsDir = path.join(__dirname, '../../reports');
  fs.readdir(reportsDir, (err, files) => {
    if (err) return res.status(500).json({ files: [] });
    // Only send PDF files
    res.json({ files: files.filter(f => f.endsWith('.pdf')) });
  });
});

module.exports = router;
