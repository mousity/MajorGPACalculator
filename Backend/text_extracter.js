const pdf = require('pdf-parse');
const fs = require('fs');



const pdfPath = 'SSR_TSRPT2.pdf' //path to pdf file




const textExtracter = async (filename) => {
    
    
    
    try {
        let dataBuffer = fs.readFileSync(filename);
        const data = await pdf(dataBuffer);
        let text = data.text;
        //save text to file
        fs.writeFileSync('transcript.txt', text);
        sortData(text);
        return text;
    }
    catch(error) {
        console.log("Error extracting text: " + error.message);
        
    }

    
}



const sortData = (pdftext) => { 

    //find beginning of transcript in string
    let transcriptStart = pdftext.indexOf("--------------- Beginning");
    let transcriptEnd = pdftext.indexOf("End of");
    /// create new string starting at transcript start
    let transcriptString = pdftext.substring(transcriptStart, transcriptEnd);
    
    let transcriptArray = transcriptString.split("\n");
    //console.log(transcriptArray);
    //save it to json in readable format
    grades = [];
    
    //data cleaning

    transcriptArray = transcriptArray.filter((item) => {
        //remove strings that contain Req Designation
        return !item.includes("Req Designation") && !item.includes("Course Topic:");
    });

    for (let i = 0; i < transcriptArray.length; i++) {
        //find index of course  and end the index of term
        //check if string countains Course Description
        if(transcriptArray[i].includes("Course Description")) {
            for(let j=i+1; j < transcriptArray.length; j++) {
                // look through term and find the term
                if(transcriptArray[j].includes("Term")){
                    
                    break;
                }
                else if(transcriptArray[j].includes("Contact Hours")) {
        
                    grades.push(transcriptArray[j-1]); //push the course and grade
                }

            }


            
        }
        

    }



    console.log(grades);
    fs.writeFileSync('transcript.json', JSON.stringify(transcriptArray, null, 2)); //save it to json in readable format


    
}

let x = textExtracter(pdfPath).then((data) => {
    //console.log(data);

    return data;//return data to x
}
)
.catch((error) => {
    console.log(error);
}
)

module.exports = textExtracter;

