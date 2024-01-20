const pdf = require('pdf-parse');
const fs = require('fs');



const pdfPath = 'transcript.pdf'

const textExtracter = (filename) => {
    
    let dataBuffer = fs.readFileSync(filename);
    pdf(dataBuffer).then(function(data) {
      console.log(data.text);
    }).catch(error => {
      console.log("Error extracting text: " + error.message);
    });
    


}

let x = textExtracter(pdfPath)
