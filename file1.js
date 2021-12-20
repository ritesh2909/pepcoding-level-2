const cheerio = require("cheerio");
const request = require("request");

function getHeading(contentArr, $)
{
    let allHeadingsArr = [];
    for(let i = 0;i<contentArr.length;i++)
    {
        let data = $(contentArr[i]).text();
        allHeadingsArr.push(data);
    }

    let headingArr = [];
    for(let i = 0;i<4;i++)
    {
        headingArr.push(allHeadingsArr[i]);
    }

    return headingArr;

};

function getContent(contentArr, $)
{
    for(let i = 0;i<contentArr.length;i++)
    {
        contentArr[i] = $(contentArr[i]).text();
    }

    let finalContentArr = [];
    finalContentArr.push(contentArr[2]);
    finalContentArr.push(contentArr[3]+contentArr[4]+contentArr[5]+contentArr[6]+contentArr[7]);
    finalContentArr.push(contentArr[8]);
    finalContentArr.push(contentArr[9]);

    return finalContentArr;
};

module.exports = {
    getHeading : getHeading,
    getContent : getContent
};