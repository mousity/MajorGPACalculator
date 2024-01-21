const express = require('express');
const app = express();
const { ocrSpace } = require('ocr-space-api-wrapper');
const cors = require('cors');
const pdf = require('pdf-parse');
const fs = require('fs');
// const API_KEY = require('dotenv').config().parsed.API_KEY // add the api key to the env instead of having it in the codebase
const multer = require('multer')
const textExtracter = require('./text_extracter');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.pdf') //Appending .jpg
  }
})
var upload = multer({ storage: storage });
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
    const response = await ocrSpace(req.body.imageUrl, { apiKey: API_KEY });
    res.json(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


app.get('/extract-text', (req, res) => {
  const pdfPath = './SamrMounaTranscriptFall20231.pdf';
  let dataBuffer = fs.readFileSync(pdfPath);
  
  pdf(dataBuffer).then(function (data) {
    res.send({ text: data.text });
  }).catch(error => {
    res.status(500).send("Error extracting text: " + error.message);
  });
});

app.post('/extract-text', upload.single('file'), (req, res) => {//currently using this one from frontend
  console.log(req.file);
  const pdfPath = "./" + req.file.path;
  console.log(pdfPath);
  let dataBuffer = fs.readFileSync(pdfPath);
  let extraxtedText = textExtracter(pdfPath);
  textExtracter(pdfPath).then((data) => {
    console.log(data);// Extracted text
    /**
     *  Manipulate the extracted text where it becomes an array of json objects
     * {
     *  courseCode: "COMP 248",
     *  courseTitle: "Object-Oriented Programming I",
     *  courseCredits: 3,
     * }
     * right now its an array of strings
     * 
     */
    res.send({ text: data });
  }).catch(error => {
    res.status(500).send("Error extracting text: " + error.message);
  });
  
  // pdf(dataBuffer).then(function (data) {
  //   console.log({ text: data.text })
  //   res.send({ text: data.text });
  // }).catch(error => {
  //   res.status(500).send("Error extracting text: " + error.message);
  // });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


