import React, { useState } from 'react';
import axios from 'axios'; 
import DisplayText from './DisplayText';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [extractedText, setExtractedText] = useState('');
    const [summary, setSummary] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:5000/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setExtractedText(response.data.text); // Set the extracted text
            // Here you can implement the logic to generate a summary from the extracted text
            setSummary('This is a placeholder for the summary.'); // Placeholder for summary
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} accept=".pdf, image/*" />
                <button type="submit">Upload</button>
            </form>
            <DisplayText extractedText={extractedText} summary={summary} /> {/* Render the DisplayText component */}
        </div>
    );
};

export default FileUpload;
