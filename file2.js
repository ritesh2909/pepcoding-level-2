const request = require("request");
const cheerio = require("cheerio");
const WorkAfterGettingURL = require("./index");

const url = "https://www.wikipedia.org/";

request(url, cb);

function cb(err, response, html){
    if(err)
        console.log(err);
    else
        extractLink(html);
}



function extractLink(html){
    let $ = cheerio.load(html);
    let content5 = $("a[title='R']");
    let finalLink = "https://en.wikipedia.org/wiki/R"
    WorkAfterGettingURL.JustGiveMeURL(finalLink);
}
