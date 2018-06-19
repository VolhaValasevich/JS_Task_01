const XLSX = require("xlsx");
const fs = require("fs");
const minimist = require("minimist");

function main() {
    const jsonregexp = /.+.json$/;
    let inputdir = "./";
    let outputdir = "./ConvertedFiles";
    let list_of_files;
    let jsonobj;
    const args = minimist(process.argv.slice(2));

    if (args.inputDir != null) inputdir = args.inputDir;
    if (args.outputDir != null) {
        outputdir = args.outputDir;
        if (checkOutputDir(outputdir) === 0) {
            console.log("Directory [" + outputdir + "] does not exist and cannot be created.");
            return;
        }
    }

    try {
        list_of_files = fs.readdirSync(inputdir);
    } catch (err) {
        console.log("Cannot read files from [" + inputdir + "]. Check if it exists or is avaliable.");
        return;
    }


    list_of_files.forEach(element => {
        if (list_of_files[i].toLowerCase().match(jsonregexp)) {
            const jsonstring = fs.readFileSync(inputdir + element)
            try {
                jsonobj = JSON.parse(jsonstring);
            } catch (err) {
                console.log("File [" + element + "] contains invalid data and was ignored");
                continue;
            }
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, jsontosheet(jsonobj), element);
            try {
                XLSX.writeFile(workbook, outputdir + "/" + element.replace("json", "xlsx"));
            } catch (err) {
                console.log("Cannot write " + element + " in " + outputdir);
                return;
            }
        }
    })
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
    try {
        fs.lstatSync(outputdir).isDirectory();
    } catch (err) {
        try {
            fs.mkdirSync(outputdir);
        } catch (err) {
            console.log(err);
            return 0;
        }
    }
}

main();