const request = require("request-promise-native");
let url = "http://services.groupkt.com/country/get/";
let flag = false;
if (process.argv.length >= 3) {
    const countrycode = process.argv[2];
    switch (countrycode.length) {
        case 2: {
            url = url + "iso2code/" + countrycode.toUpperCase();
            break;
        }
        case 3: {
            url = url + "iso3code/" + countrycode.toUpperCase();
            break;
        }
        default: {
            url = url.replace("get/", "search?text=") + countrycode;
            flag = true;
        }
    }
    request(url, { json: true })
        .then(function (body) {
            let countryjson = body.RestResponse.result;
            if (typeof (countryjson) != "undefined") {
                if (!flag) {
                    console.log("Country name: " + countryjson.name);
                    console.log("ISO 2 code: " + countryjson.alpha2_code);
                    console.log("ISO 3 code: " + countryjson.alpha3_code);
                } else {
                    if (countryjson.length > 0) {
                        for (let i = 0; i < countryjson.length; i++) {
                            console.log("Country name: " + countryjson[i].name);
                            console.log("ISO 2 code: " + countryjson[i].alpha2_code);
                            console.log("ISO 3 code: " + countryjson[i].alpha3_code);
                        }
                    } else {
                        console.log("No '" + countrycode + "' found");
                    }
                }
            } else {
                console.log("No country with [" + countrycode + "] code found");
            }
        });
} else {
    console.log("Enter country name or code");
}
