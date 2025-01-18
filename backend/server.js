const express = require('express');
const cors = require('cors');
const { uploadFile } = require('./controllers/uploadController'); // Import the upload controller

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// Routes
app.post('/api/upload', uploadFile); // Use the upload route from the controller

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
