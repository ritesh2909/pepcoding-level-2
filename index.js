const request = require("request");     
const cheerio = require("cheerio");   
const fs = require("fs");              
const xlsx = require("xlsx");           
const path = require("path");          
const get = require("./file1");

function GotTheURL(url){
    request(url, cb);
}

function cb(err, repsonse, html){
    if(err){
        console.log(err);
    }else{
        extractHTML(html);
    }
}

function extractHTML(html){
    let $ = cheerio.load(html);

   
    let contentArr = $(".mw-headline");

    let headingArr = get.getHeading(contentArr, $);

    
    contentArr = $("div.vector-body>div.mw-body-content.mw-content-ltr>div.mw-parser-output>p");

    let finalContentArr = get.getContent(contentArr, $);



    console.log("Scraping Data from Wikipedidia...");
   
    let filePath = path.join(__dirname, "data.xlsx");
    let data = excelReader(filePath);
    for(let i=0; i<4; i++){
        let currObj = {
            "Heading" : headingArr[i],
            "Content" : finalContentArr[i]
        };
        data.push(currObj);
        console.log('\x1b[36m%s\x1b[0m', headingArr[i] + ": ")
        console.log(finalContentArr[i]);
    }
    
    excelWriter(filePath, data);
}



function excelWriter(filePath, json, sheetName){
    let newWB = xlsx.utils.book_new();

    let newWS = xlsx.utils.json_to_sheet(json);
    
    xlsx.utils.book_append_sheet(newWB, newWS, sheetName);
    
    xlsx.writeFile(newWB, filePath);
}




function excelReader(filePath, sheetname){
    if(fs.existsSync(filePath)){

        let wb = xlsx.readFile(filePath);

        let excelData = wb.Sheets[sheetname];

        let ans = xlsx.utils.sheet_to_json(excelData);

       
        return ans;
    }
    return [];
}

module.exports = {
    JustGiveMeURL: GotTheURL
}