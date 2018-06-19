const fs = require("fs");

function main() {
    if (process.argv.length < 3) {
        console.log("You didn't enter JSON file name!");
    } else {
        const jsonfilename = process.argv[2];
        let logfilename = "log.txt";
        try {
            jsonstring = fs.readFileSync(jsonfilename, "utf-8");
        } catch (error) {
            console.log("File [" + jsonfilename + "] is unavailable or does not exist!");
        }
        const jsonobject = JSON.parse(jsonstring);
        const logstring = checkJson(jsonobject);
        if (logstring === "") {
            console.log("OK");
        } else {
            if (process.argv.length > 3) logfilename = process.argv[3];
            try {
                fs.writeFileSync(logfilename, logstring, "utf-8")
            } catch (err) {
                console.log("Cannot write in [" + logfilename + "]");
            }
        }
    }
}

function checkJson(jsonobject) {
    let errorstring = "";
    if (typeof (jsonobject.flag) != "boolean")
        errorstring += '"flag": expected type boolean, found [' + typeof (jsonobject.flag) + '];\n'
    if (typeof (jsonobject.myPromises) != "array")
        errorstring += '"myPromises": expected type array, found [' + typeof (jsonobject.myPromises) + '];\n'
    if (typeof (jsonobject.element) != "object")
        errorstring += '"element": expected type object, found [' + typeof (jsonobject.element) + '];\n'
    if (jsonobject.screenshot != null)
        errorstring += '"screenshot": expected type null, found [' + typeof (jsonobject.screenshot) + '];\n'
    if (typeof (jsonobject.elementText) != "string")
        errorstring += '"elementText": expected type string, found [' + typeof (jsonobject.elementText) + '];\n'
    if (jsonobject.allElementsText.indexOf("const") < 0)
        errorstring += '"allElementsText": [' + jsonobject.allElementsText + '] does not contain "const";\n'
    if (jsonobject.counter <= 10)
        errorstring += '"counter": should be more than 10, found [' + jsonobject.counter + '];\n'
    if (jsonobject.config != "Common")
        errorstring += '"config": expected [Common], found [' + jsonobject.config + '];\n'
    if (jsonobject.const.toLowerCase() != "first")
        errorstring += '"const": expected [FirSt], found [' + jsonobject.const + '];\n'
    if (typeof (jsonobject.parameters) != "object") {
        errorstring += '"parameters": expected type object, found [' + typeof (jsonobject.parameters) + '];\n'
    } else if (jsonobject.parameters.length != 8) {
        errorstring += '"parameters": expected length [8], found [' + jsonobject.parameters.length + '];\n'
    }
    if (typeof (jsonobject.description) != "string") {
        errorstring += '"description": expected type string, found [' + typeof (jsonobject.description) + '];\n'
    } else if (jsonobject.description.length < 5 || jsonobject.description.length > 13) {
        errorstring += '"description": expected length [5; 13], found [' + jsonobject.description.length + '];\n'
    }
    return errorstring;
}

main();