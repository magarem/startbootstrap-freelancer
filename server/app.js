const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const fs = require('fs');
//joining path of directory 
const directoryPath = "../client/src/assets/img/portfolio/"//path.join(__dirname);
const data = {
    navbar: "../client/src/assets/data/navbar.json",
    portfolio: "../client/src/assets/data/portfolio.json"
}
const data_portfolio = "../client/src/assets/data/portfolio.json"//path.join(__dirname);
//passsing directoryPath and callback function
let files_ = []
let dataFileLines = []
// fs.readFile(dataFile, {encoding: 'utf-8'}, function(err,data){
//     if (!err) {
//         // console.log('received data: ' + data);
//         // response.writeHead(200, {'Content-Type': 'text/html'});
//         // response.write(data);
//         // response.end();
//         // dataFileJson = JSON.parse(dataFile)
//         dataFileObj = JSON.parse(data)
//     } else {
//         console.log(err);
//     }
// });
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    var files = files.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
    var files = files.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
    files.forEach(function (file, i) {
        // Do whatever you want to do with the file
        obj = `{
            "order": ${i},
            "img": "${file}",
            "title": "${file.split('.')[0]}",
            "body": "teste"
        }`
        files_.push(file); 
        dataFileLines.push(obj)
    });
    console.log('['+dataFileLines.join(',')+']');
    fs.writeFileSync(data.portfolio, '['+dataFileLines.join(',')+']');
   
});

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });

app.get('/api/dataload/:id', (req, res) => {
    console.log(req.params);
    fs.readFile("../client/src/assets/data/"+ req.params.id + ".json", {encoding: 'utf-8'}, function(err, data){
        if (!err) {
            dataFileObj = ""
            dataFileObj = JSON.parse(data)
            console.log(dataFileObj)
            res.send(dataFileObj)
        } else {
            console.log(err);
        }
    });
    
    }
)
app.get('/api/portfolio', (req, res) => {
    fs.readFile(data.portfolio, {encoding: 'utf-8'}, function(err,data){
        if (!err) {
            dataFileObj = ""
            // console.log('received data: ' + data);
            // response.writeHead(200, {'Content-Type': 'text/html'});
            // response.write(data);
            // response.end();
            // dataFileJson = JSON.parse(dataFile)
            dataFileObj = JSON.parse(data)
            console.log(dataFileObj)
            res.send(dataFileObj)
        } else {
            console.log(err);
        }
    });
    
    }
)
app.get("/products", (req,res) => {
    const products = [
    {
      id: 1,
      name: "hammer",
    },
    {
      id: 2,
      name: "screwdriver",
    },
    ,
    {
      id: 3,
      name: "wrench",
    },
   ];
  
   res.json(products);
  });


app.listen(port, () => console.log(`Example app listening on port ${port}!`));