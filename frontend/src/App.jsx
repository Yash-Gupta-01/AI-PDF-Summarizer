import { useState } from 'react';
import './App.css';
import FileUpload from './FileUpload'; // Import the FileUpload component

function App() {

  return (
    <>
      <h1>Document Summary Assistant</h1>
      <FileUpload /> {/* Render the FileUpload component */}
    </>
  );
}

export default App;
