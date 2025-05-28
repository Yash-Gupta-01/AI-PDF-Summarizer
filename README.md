# AI PDF Summarizer

This project is an AI-powered PDF summarizer with a React frontend and a Node.js/Express backend. It allows users to upload PDF files, extract text, and generate summaries using AI models.

## Features
- Upload PDF files via a web interface
- Extract text from uploaded PDFs
- Summarize extracted text using AI
- View and download summaries

## Project Structure
```
backend/   # Node.js/Express server, PDF/text extraction, API routes
frontend/  # React app (Vite), user interface for uploading and viewing summaries
```

## Getting Started

### Backend Setup
1. Navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the server:
   ```sh
   node server.js
   ```

### Frontend Setup
1. Open a new terminal and navigate to the frontend folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

## Usage
- Open the frontend app in your browser (usually at `http://localhost:5173`)
- Upload a PDF file
- Wait for the summary to be generated and displayed

## Folder Details
- `backend/controllers/` - Handles text extraction logic
- `backend/routes/` - API endpoints (e.g., file upload)
- `backend/uploads/` - Uploaded PDF files
- `frontend/src/` - React components and styles

## Requirements
- Node.js (v16 or higher recommended)
- npm

## License
MIT
