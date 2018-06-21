const XLSX = require("xlsx");
const fs = require("fs");
const util = require("util");
const minimist = require("minimist");

function main() {
    const jsonregexp = /.+.json$/;
    let inputdir = "./";
    let outputdir = "./ConvertedFiles";
    const args = minimist(process.argv.slice(2));
    if (args.inputDir != null) inputdir = args.inputDir;
    if (args.outputDir != null) outputdir = args.outputDir;
    checkOutputDir(outputdir)
        .then((readdir) => { return readdir(inputdir);})
        .then((list) => {
            list.forEach(element => {
                if (element.toLowerCase().match(jsonregexp)) {
                    const jsonobj = require(inputdir + element);
                    const workbook = XLSX.utils.book_new();
                    XLSX.utils.book_append_sheet(workbook, jsontosheet(jsonobj), element);
                    XLSX.writeFile(workbook, outputdir + "/" + element.replace("json", "xlsx"));
                }
            })
        })
        .catch((err) => { console.log(err)})
}


function jsontosheet(jsonobj) {
    const keys = Object.keys(jsonobj);
    const values = Object.values(jsonobj);
    const arr = [keys, values];
    //XLSX.utils.json_to_sheet(jsonobj) results in a "js.forEach is not a function" error
    const sheet = XLSX.utils.aoa_to_sheet(arr);
    return sheet;
}

function checkOutputDir(outputdir) {
    return new Promise(function (resolve, reject) {
        fs.lstat(outputdir, (err) => {
            if (err) { fs.mkdir(outputdir, (err) => { if (err) reject (err); }); }
        })
        resolve(util.promisify(fs.readdir));
    })
}

main();