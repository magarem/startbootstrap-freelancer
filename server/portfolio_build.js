const path = require('path');
const fs = require('fs');
const directoryPath = "../client/src/assets/img/portfolio/"
var data_portfolio = "../client/src/assets/data/portfolio.json"
var txt = ""
let dataFileLines = []
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    var files = files.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
    files.forEach(function (file, i) {
        if (file.split('.')[1]!=='zip'){
            // Do whatever you want to do with the file
            obj = `{
                "order": ${i},
                "img": "${file}",
                "title": "Foto ${i+1}",
                "body": "Foto ${i+1}"
            }`
            dataFileLines.push(obj)
        }
    });
    txt = '{"title":"Portfolio", "items": ['+dataFileLines.join(',')+']}'
    console.log(txt);
    fs.writeFileSync(data_portfolio, txt);
});