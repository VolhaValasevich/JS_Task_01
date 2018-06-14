const XLSX = require("xlsx");
const fs = require("fs");
const jsonregexp = /.+.json$/;
let inputdir = "./";
let outputdir = inputdir;
let list_of_files = fs.readdirSync(inputdir);
let jsonobj;
for (let i=0; i<list_of_files.length; i++) {
    if (list_of_files[i].toLowerCase().match(jsonregexp)) {
        let jsonstring = fs.readFileSync(inputdir + list_of_files[i])
        jsonobj = JSON.parse(jsonstring);
        let workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, jsontosheet(jsonobj), list_of_files[i]);
        writeWorkbookToFile(workbook, outputdir, list_of_files[i].replace("json", "xlsx"));
    }
}

function jsontosheet(jsonobj) {
    const keys = Object.keys(jsonobj);
    const values = Object.values(jsonobj);
    const arr = [keys, values];
    const sheet = XLSX.utils.aoa_to_sheet(arr);
    return sheet;
}

function writeWorkbookToFile(workbook, outputdir, filename) {
    XLSX.writeFile(workbook, outputdir + "/" + filename);
}