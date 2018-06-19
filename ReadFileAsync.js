const fs = require("fs");
const util = require ("util");

function readfile() {
    if (process.argv.length >= 3) {
        const filename = process.argv[2];
        let resultstring = '';
        const readfilepromise = util.promisify(fs.readFile);
        readfilepromise(filename, "utf-8")
            .then((data) => {
                const text = data.split("\n");
                text.forEach((element, index) => {
                    if (index % 2 !== 0) {
                        if (element.indexOf("\r") > -1) element = element.replace("\r", ""); 
                        resultstring = resultstring + element + " ";
                    }
                })
                console.log(resultstring);
            })
            .catch((err) => { console.log(`File ${filename} cannot be read`); })
    } else {
        console.log("You didn't enter the file name!")
    }
}

readfile();