const express = require('express');
const app = express();
const { ocrSpace } = require('ocr-space-api-wrapper');
const cors = require('cors');
const pdf = require('pdf-parse');
const fs = require('fs');
app.use(cors());

app.use(express.json());

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173',  // Replace with your frontend's origin
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));


app.post('/perform-ocr', async (req, res) => {
  try {
    const response = await ocrSpace(req.body.imageUrl, { apiKey: 'K82848076288957' });
    res.json(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

  
  app.get('/extract-text', (req, res) => {
    const pdfPath = './SamrMounaTranscriptFall20231.pdf';
 // Replace with the path to other Pdf file! Must be in same directory as index.js
  
    let dataBuffer = fs.readFileSync(pdfPath);
    pdf(dataBuffer).then(function(data) {
      res.send({ text: data.text });
    }).catch(error => {
      res.status(500).send("Error extracting text: " + error.message);
    });
  });
  

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
