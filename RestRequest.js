const request = require("request");

function main() {
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
        request(url, { json: true }, (err, res, body) => {
            if (err) throw err;
            const countryjson = body.RestResponse.result;
            if (typeof (countryjson) != "undefined") {
                if (!flag) {
                    console.log(`Country name: ${countryjson.name}\nISO 2 code: ${countryjson.alpha2_code}\nISO 3 code: ${countryjson.alpha3_code}`)
                } else {
                    if (countryjson.length > 0) {
                        countryjson.forEach(element => {
                            console.log(`Country name: ${element.name}\nISO 2 code: ${element.alpha2_code}\nISO 3 code: ${element.alpha3_code}`);
                        })
                    } else console.log(`No ${countrycode} found`);
                }
            } else console.log(`No country with ${countrycode} code found`);
        });
    } else console.log("Enter country name or code");
}

main();