// server/controllers/textExtraction.js
const fs = require('fs');
require('dotenv').config();
const pdfParse = require('pdf-parse');
const tesseract = require('tesseract.js');

exports.extractText = async (req, res) => {
  const { filePath } = req.body;

  try {
    const fileExtension = filePath.split('.').pop().toLowerCase();

    let extractedText = '';
    if (fileExtension === 'pdf') {
      const pdfData = fs.readFileSync(filePath);
      const result = await pdfParse(pdfData);
      extractedText = result.text;
    } else if (['jpg', 'png', 'jpeg'].includes(fileExtension)) {
      const result = await tesseract.recognize(filePath, 'eng');
      extractedText = result.data.text;
    } else {
      return res.status(400).json({ message: 'Unsupported file format' });
    }

    let prompt ='';
    const { GoogleGenerativeAI } = require("@google/generative-ai");

    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    prompt = "Summarize the following text: \n \n" + extractedText;

    let result = await model.generateContent(prompt);
    result = result.response.text();

    res.status(200).json({ extractedText:extractedText, summary: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error extracting text' });
  }
};
