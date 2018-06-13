if (process.argv.length >= 3) {
    const fs = require("fs");  
    const filename = process.argv[2];
    let text;
    try {
        text = fs.readFileSync(filename, "utf-8").split("\n");
    } catch (error) {
        console.log("File [" + filename + "] is unavailable or does not exist!");
    }
    for (let i=1; i < text.length; i=i+2) {
        console.log(text[i]);
    }
} else {
    console.log("You didn't enter the file name!")
}