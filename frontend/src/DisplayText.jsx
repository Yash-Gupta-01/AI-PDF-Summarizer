import React from 'react';

const DisplayText = ({ extractedText, summary }) => {
    const copyToClipboard = () => {
        navigator.clipboard.writeText(summary);
        alert('Summary copied to clipboard!');
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ width: '45%', padding: '10px', border: '1px solid #ccc' }}>
                <h2>Extracted Text</h2>
                <p>{extractedText}</p>
            </div>
            <div style={{ width: '45%', padding: '10px', border: '1px solid #ccc' }}>
                <h2>Summary</h2>
                <p>{summary}</p>
                <button onClick={copyToClipboard}>Copy Summary</button>
            </div>
        </div>
    );
};

export default DisplayText;
