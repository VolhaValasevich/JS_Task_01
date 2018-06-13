if (process.argv.length >= 3) {
    const fs = require("fs");  
    const filename = process.argv[2];
    let text;
    let resultstring = '';

    try {
        text = fs.readFileSync(filename, "utf-8").split("\n");
    } catch (error) {
        console.log("File [" + filename + "] is unavailable or does not exist!");
    }

    for (let i=1; i < text.length; i=i+2) {
        if (text[i].indexOf("\r") > -1) {
            text[i] = text[i].replace("\r", "");
        }
        resultstring = resultstring + text[i] + " ";
    }

    console.log(resultstring);

} else {
    console.log("You didn't enter the file name!")
}