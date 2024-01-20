const pdf = require('pdf-parse');
const fs = require('fs');



const pdfPath = 'transcript.pdf'



// const textExtracter = (filename) => {
    
//     let dataBuffer = fs.readFileSync(filename);
//     pdf(dataBuffer).then(function(data) {
//         let text = data.text;
//         let sortedData = sortData(text);
//         //console.log(sortedData);
//         console.log(sortedData);
//         return sortedData;
//     }).catch(error => {
//       console.log("Error extracting text: " + error.message);
//     });
    
// }

//async version of textExtracter

const textExtracter = async (filename) => {
    
    
    
    try {
        let dataBuffer = fs.readFileSync(filename);
        const data = await pdf(dataBuffer);
        let text = data.text;
        return text;
    }
    catch(error) {
        console.log("Error extracting text: " + error.message);
        return "Error extracting text: " + error.message + "";
    }

    
}



const sortData = (pdftext) => { //mean to sort the data into a json object
    
}

let x = textExtracter(pdfPath).then((data) => {
    console.log(data);
    return data;
}
)
.catch((error) => {
    console.log(error);
}
)

//using try catch to catch 
console.log(x);

