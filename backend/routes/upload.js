// server/routes/upload.js
const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// File upload route
router.post('/', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'File not uploaded' });
  }
  res.status(200).json({ filePath: req.file.path, fileName: req.file.filename });
});

module.exports = router;
