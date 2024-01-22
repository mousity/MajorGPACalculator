const express = require('express');
const app = express();
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
var convertapi = require('convertapi')('BSqKQMmAR6SIiacO');
app.use(cors());
app.use(express.json());

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173',  // Replace with your frontend's origin
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.post('/extract-text', upload.single('file'), async (req, res) => {//currently using this one from frontend
  if (req.file.path) {
  const pdfPath = "./" + req.file.path;
  convertapi.convert('decrypt', {
    File: pdfPath
  }, 'pdf').then(function (result) {
    result.saveFiles(pdfPath);
  });
  textExtracter(pdfPath).then(async (data) => {
    console.log(data);// Extracted text
    let formattedData = [];
    formattedData = data.map((course) => {
      if (course.includes('.') && course.substr(-1) != '0') {
        if (course.substr(-1) == '+' || course.substr(-1) == '-') {
          let currentGrade = '';
          switch (course.slice(-2,-1)) {
            case 'A': currentGrade = (course.slice(-1) == '+' ? '4.0' : '3.7');break;
            case 'B': currentGrade = (course.slice(-1) == '+' ? '3.3' : '2.7');break;
            case 'C': currentGrade = (course.slice(-1) == '+' ? '2.3' : '1.7');break;
            case 'D': currentGrade = (course.slice(-1) == '+' ? '1.3' : '1.0');break;
          }
          course = course.slice(0,-2) + currentGrade;
        }
        else {
          let currentGrade = '';
          switch (course.slice(-1)) {
            case 'A': currentGrade = '4.0';break;
            case 'B': currentGrade = '3.0';break;
            case 'C': currentGrade = '2.0';break;
            case 'D': currentGrade = '1.0';break;
            case 'E','F': currentGrade = '0.0';break;
          }
          course = course.slice(0,-1) + currentGrade;
        }
        console.log(course);
        let currentCode = (course[3]==' '? course.slice(0,3) + ' ' + course.slice(5,8) : course.slice(0,4) + ' ' + course.slice(6,9));
        return({code: currentCode, credits: course.slice(-7,-3), grade: course.substr(-3)});
      }
    }).filter(Boolean);
    const uniqueData = [...new Map(formattedData.map(course =>
      [course['code'], course])).values()];
    console.log(uniqueData);
    res.send({ array:uniqueData} );
  }).catch(error => {
    res.status(500).send("Error extracting text: " + error.message);
  });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


