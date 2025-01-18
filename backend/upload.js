const express = require('express');
const multer = require('multer');
const path = require('path');
const pdf = require('pdf-parse'); // Import pdf-parse for PDF text extraction
const fs = require('fs');

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the uploads directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to the file name
    },
});

const upload = multer({ storage });

// Simple summarization function (placeholder)
const generateSummary = (text) => {
    const sentences = text.split('. ');
    return sentences.slice(0, 3).join('. ') + '.'; // Return the first 3 sentences as a summary
};

// Route to handle file uploads
router.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    // Process the uploaded file here (e.g., extract text)
    const filePath = path.join(__dirname, '../uploads', req.file.filename);
    
    // Read the PDF file and extract text
    let dataBuffer = fs.readFileSync(filePath);
    pdf(dataBuffer).then(function(data) {
        const summary = generateSummary(data.text); // Generate summary from extracted text
        // Send the extracted text and summary as a response
        res.send({ message: 'File uploaded successfully', text: data.text, summary: summary });
    }).catch(err => {
        res.status(500).send('Error processing file: ' + err.message);
    });
});

module.exports = router;
