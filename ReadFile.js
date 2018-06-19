const fs = require("fs");  

function readfile() {
    if (process.argv.length >= 3) {
        const filename = process.argv[2];
        let text;
        let resultstring = '';
        try {
            text = fs.readFileSync(filename, "utf-8").split("\n");
        } catch (error) {
            console.log("File [" + filename + "] is unavailable or does not exist!");
        }
        text.forEach((element, index) => {
            if (index % 2 !== 0) {
                if (element.indexOf("\r") > -1) element = element.replace("\r", "");
                resultstring = resultstring + element + " ";
            }
        })
        console.log(resultstring);
    } else {
        console.log("You didn't enter the file name!")
    }    
} 

readfile();
