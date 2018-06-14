const XLSX = require("xlsx");
const fs = require("fs");
const jsonregexp = /.+.json$/;
let inputdir = "./";
let outputdir = inputdir;
let list_of_files;
let jsonobj;

const args = require("minimist")(process.argv.slice(2));
if (args.inputDir != null) {
    inputdir = args.inputDir;
} 
if (args.outputDir != null) {
    outputdir = args.outputDir;
} 

try {
    list_of_files = fs.readdirSync(inputdir);
} catch (err) {
    console.log("Cannot read files from " + inputdir);
    return;
}

for (let i=0; i<list_of_files.length; i++) {

    if (list_of_files[i].toLowerCase().match(jsonregexp)) {

        let jsonstring = fs.readFileSync(inputdir + list_of_files[i])

        try {
            jsonobj = JSON.parse(jsonstring);
        } catch (err) {
            console.log("File [" + list_of_files[i] + "] contains invalid data and is ignored");
            continue;
        }

        let workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, jsontosheet(jsonobj), list_of_files[i]);

        try {
            XLSX.writeFile(workbook, outputdir + "/" + list_of_files[i].replace("json", "xlsx")); 
        } catch (err) {
            console.log("Cannot write " + list_of_files[i] + " in " + outputdir);
            return;
        }
    }
}

function jsontosheet(jsonobj) {
    const keys = Object.keys(jsonobj);
    const values = Object.values(jsonobj);
    const arr = [keys, values];
    //XLSX.utils.json_to_sheet(jsonobj) results in a "js.forEach is not a function" error
    const sheet = XLSX.utils.aoa_to_sheet(arr);
    return sheet;
}