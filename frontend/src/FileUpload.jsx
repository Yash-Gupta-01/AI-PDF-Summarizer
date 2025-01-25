import React, { useState } from 'react';
import axios from 'axios';
import './FileUpload.css'; // Import the CSS file
import { FaUpload, FaClipboard } from 'react-icons/fa'; // Importing icons

const Upload = () => {
  const [file, setFile] = useState(null);
  const [Extractedtext, setExtractedtext] = useState('');
  const [Summary, setSummary] = useState('');
  const [isUploaded, setIsUploaded] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // State for text expansion
  const [loading, setLoading] = useState(false); // State for loading

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    setLoading(true); // Start loading

    try {
      const uploadRes = await axios.post('http://localhost:5000/api/upload', formData);
      const filePath = uploadRes.data.filePath;

      const extractRes = await axios.post('http://localhost:5000/api/extract-text', { filePath });
      setExtractedtext(extractRes.data.extractedText);
      setSummary(extractRes.data.summary);
      setIsUploaded(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Text copied to clipboard!');
  };

  return (
    <div className="app-container">
      <h1>Document Summary Assistant</h1>
      {!isUploaded ? (
        <div className="upload-container">
          <h2>Upload Document</h2>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload} disabled={loading}>
            {loading ? 'Uploading...' : <><FaUpload /> Upload & Extract</>}
          </button>
        </div>
      ) : (
        <div className="text-container">
          <div className="text-box">
            <h3>Extracted Text:</h3>
            <div className="scrollable-container">
              <p>{isExpanded ? Extractedtext : `${Extractedtext.substring(0, 200)}...`}</p>
              {!isExpanded && <button onClick={() => setIsExpanded(true)}>Read More</button>}
            </div>
            <button className="copy-button" onClick={() => copyToClipboard(Extractedtext)}>
              <FaClipboard /> Copy text
            </button>
          </div>
          <div className="text-box">
            <h3>Summary:</h3>
            <div className="scrollable-container">
              <p>{isExpanded ? Summary : `${Summary.substring(0, 200)}...`}</p>
              {!isExpanded && <button onClick={() => setIsExpanded(true)}>Read More</button>}
            </div>
            <button className="copy-button" onClick={() => copyToClipboard(Summary)}>
              <FaClipboard /> Copy text
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Upload;
