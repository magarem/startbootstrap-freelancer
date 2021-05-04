const FormData = require('form-data');
const {request} = require("http");
const fs = require("fs");
const extract = require('extract-zip')
const path = require('path');
var zipper = require('zip-local');
const Jimp = require('jimp');
const fse = require('fs-extra')



var myArgs = process.argv.slice(2);
console.log('myArgs: ', myArgs);

var target = path.join(__dirname) + '/../client/src/assets/'

async function scaleToFitBatch(siteName, directoryPath, files, cb) {
    // Read the image.
    console.log(siteName, directoryPath, files, cb);
    files.forEach(async function (file, i, array) {
        if (file.split('.')[1]!=='zip'){
            const buffer = fs.readFileSync(directoryPath + '/' + file);
            const image = await Jimp.read(buffer);
            console.log(file)
            await image.scaleToFit(1100, 900)
            // Save and overwrite the image
            console.log(`to: ./${siteName}/img/portfolio/${i}.jpg`);
            await image.write(`./${siteName}/img/portfolio/${i}.jpg`);
            // if (newName == total) {console.log('fim!!!')}
        }

        if (i === array.length-1){ 
            console.log('terminou');
            setTimeout(function(){cb(siteName)}, 3000);
        }
        
    })
}
// const cleanUpDir = (dir) => {
//     fs.readdir(dir, (err, files) => {
//         if (err) throw err;
//         for (const file of files) {
//           fs.unlink(path.join(dir, file), err => {
//             if (err) throw err;
//           });
//         }
//       });
// }
const portfolio_get_files = (siteName, directoryPath, cb) => {
    
    // Copy site skeleton
    try {
        console.log(`Build dir: ./${siteName}`);
        if (fs.existsSync(`./${siteName}`)) {
            console.log(`Deleting: ./${siteName}`);
            fs.rmdirSync(`./${siteName}`, { recursive: true })
        }
        fse.copySync('./site', `./${siteName}`)
        console.log('success!')
    } catch (err) {
        console.error(err)
    }

    console.log(siteName, directoryPath, cb);
    //Clean up dir
    // cleanUpDir(`./${siteName}/img/portfolio`)

    files = fs.readdirSync(directoryPath)
    var files = files.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
    scaleToFitBatch(siteName, directoryPath, files, cb)
}

async function scaleToFit(file, newName, total) {
    // Read the image.
    const buffer = fs.readFileSync(file);
    const image = await Jimp.read(buffer);
    console.log(newName, image.bitmap.width)
    
    await image.scaleToFit(1100, 900)
    // Save and overwrite the image
    await image.write(`pack_portfolio/${newName}.jpg`);
    // if (newName == total) {console.log('fim!!!')}
    return newName
}

const site_zip = (file) => {
    zipper.sync.zip('./'+file).compress().save(file+'.zip');
   
} 

const site_upload = (file) => {
    console.log('file:', file);
    var form = new FormData();
    form.append('file', fs.createReadStream(file));
    const req = request(
        {
        host: 'localhost',
        port: '3000',
        path: '/upload',
        method: 'POST',
        headers: form.getHeaders(),
        },
        response => {
            console.log(response.statusCode); // 200
            // unzip('pack_portfolio.zip', target)
        }
    );
    form.pipe(req);
}

async function unzip (file, target) {
    try {
      await extract(target + file, { dir: target})
      console.log('Extraction complete')
      buildPortfolioScript()
    } catch (err) {
        console.log(err);
      // handle any errors
    }
}

const portfolio_build_script = (siteName) => {
    const directoryPath = `./${siteName}/img/portfolio/`
    var data_portfolio = `./${siteName}/data/portfolio.json`
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
}

const cleanUpDir = (directory) => {
    if (fs.existsSync(directory)) {
        fs.readdir(directory, (err, files) => {
            if (err) throw err;
            for (const file of files) {
                fs.unlink(path.join(directory, file), err => {
                    if (err) throw err;
                });
            }
        });
    }
}

if (myArgs[0] == "portfolio_pack"){
    portfolio_get_files(myArgs[1], myArgs[2], portfolio_build_script)
}

if (myArgs[0] == "zip"){
    site_zip(myArgs[1], myArgs[2])
}

if (myArgs[0] == "upload"){
    console.log('./' + myArgs[1] + '.zip');
    site_upload('./' + myArgs[1] + '.zip')
}



console.log("----");
// zip('./pack_portfolio')
  

// zip('./pack_portfolio')
// cleanUpDir(target)
// upload('pack.zip', target)