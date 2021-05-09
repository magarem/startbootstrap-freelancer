const FormData = require('form-data');
const {request} = require("http");
const fs = require("fs");
const extract = require('extract-zip')
const path = require('path');
var zipper = require('zip-local');
const Jimp = require('jimp');
const fse = require('fs-extra')
const webp=require('webp-converter');
const sharp = require('sharp');
const sizeOf = require('image-size')

var myArgs = process.argv.slice(2);
console.log('myArgs: ', myArgs);

var target = path.join(__dirname) + '/../client/src/assets/'

async function correctImageFileType(siteName, directoryPath){
     //Convert image file webp to jpeg
        files = fs.readdirSync(directoryPath)
        var files = files.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
        var i=0
        
        for ( const file of files ) {
            file_ = directoryPath + '/' + file
            if (file_.split('.')[1].toLowerCase() == 'webp'){
                console.log(file_, directoryPath + '/' + file.split('.')[0].toLowerCase() + '.jpg');
                await sharp(file_)
                .toFile(directoryPath + '/' + file.split('.')[0].toLowerCase() + '.jpg')
                // const result = webp.dwebp(file_, directoryPath + '/' + file.split('.')[0].toLowerCase() + '.jpg',"-o",logging="-v");
                // result.then((response) => {
                //     console.log('>>', response);
                // });
            }
        }
    
}

async function scaleToFitBatch(siteName, directoryPath) {
//   new Promise((resolve) => {
    // Read the image.
    console.log(siteName, directoryPath, files);  
    files = fs.readdirSync(directoryPath)
    var files = files.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
    const acceptedImageTypes = ['.gif', '.jpeg', '.jpg', '.png'];
    var i=0
    for ( const file of files ) {
        console.log("file['type']>", path.extname(file));

        if (acceptedImageTypes.includes(path.extname(file))) {
            const image = await Jimp.read(directoryPath + '/' + file);
            await image.scaleToFit(1100, 900)
            // Save and overwrite the image
            console.log(`to: ${siteName}/img/portfolio/${i}.jpg`);
            await image.writeAsync(`${siteName}/img/portfolio/${i}.jpg`);
            i++
        }
    }
}

async function avatarImgUpdate(siteName, directoryPath) {
    
    files = fs.readdirSync(directoryPath)
    var files = files.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
    
     // original image
     let originalImage = directoryPath + '/' + files[0];
     console.log('avatar image:', originalImage);

     // file name for cropped image
     let outputImage = `${siteName}/img/avatarPre.jpg`;
     let outputImage_croped = `${siteName}/img/avatar.jpg`;
     console.log('outputImage avatar image:', outputImage);
 
  
    
    const info = sizeOf(originalImage)
    console.log(info.width, info.height)

    if (info.width > info.height){
        await sharp(originalImage)
        .resize({
            fit: sharp.fit.contain,
            height: 250
        })
        .jpeg({ quality: 100 })
        .toFile(outputImage)
    }else{
        await sharp(originalImage)
        .resize({
            fit: sharp.fit.contain,
            width: 250
        })
        .jpeg({ quality: 100 })
        .toFile(outputImage)
    }

    await sharp(outputImage).extract({ width: 250, height: 250, left: 0, top: 0 }).toFile(outputImage_croped)
         .then(function(new_file_info) {
             console.log("Image cropped and saved");
         })
         .catch(function(err) {
             console.log("An error occured:", err);
         });
}

const site_new_scaffold = (siteName) => {
    // Delete if exists
    
    if (fs.existsSync(`${siteName}`)) {
        console.log(`Deleting: ${siteName}`);
        fs.rmdirSync(`${siteName}`, { recursive: true })
    }
    // Copy site skeleton
    try {
        fse.copySync('./sites/skeleton', `${siteName}`)
        console.log(`Build dir: ${siteName}`);
        console.log('success!')
    } catch (err) {
        console.error(err)
    }
}

const site_zip = (file) => {
    zipper.sync.zip(file).compress().save(file+'.zip');
   
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

const updateSiteData_navbar = (siteName) => {
    var sitePath = `${siteName}/data/navbar.json`
    // read file and make object
    let content = JSON.parse(fs.readFileSync(sitePath, 'utf8'));
    // edit or add property
    content.logo.txt = siteName.split('/').pop();
    //write file
    fs.writeFileSync(sitePath, JSON.stringify(content));
}
const updateSiteData_mainHeader = (siteName, avatarFileName) => {
    var sitePath = `${siteName}/data/mainheader.json`
    // read file and make object
    let content = JSON.parse(fs.readFileSync(sitePath, 'utf8'));
    // edit or add property
    content.avatar = avatarFileName;
    //write file
    fs.writeFileSync(sitePath, JSON.stringify(content));
}

const portfolio_build_script = (siteName) => {
    const directoryPath = `${siteName}/img/portfolio/`
    var data_portfolio = `${siteName}/data/portfolio.json`
    var txt = ""
    let dataFileLines = []

    var files = fs.readdirSync(directoryPath)
    files = files.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
    var i=0
    for ( const file of files ) {
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
        i++
    }
    txt = '{"title":"Portfolio", "items": ['+dataFileLines.join(',')+']}'
    console.log(txt);
    fs.writeFileSync(data_portfolio, txt);   

    // fs.readdir(directoryPath, function (err, files) {
    //     //handling error
    //     if (err) {
    //         return console.log('Unable to scan directory: ' + err);
    //     } 
    //     //listing all files using forEach
    //     var files = files.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
    //     files.forEach(function (file, i) {
    //         if (file.split('.')[1]!=='zip'){
    //             // Do whatever you want to do with the file
    //             obj = `{
    //                 "order": ${i},
    //                 "img": "${file}",
    //                 "title": "Foto ${i+1}",
    //                 "body": "Foto ${i+1}"
    //             }`
    //             dataFileLines.push(obj)
    //         }
    //     });
    //     txt = '{"title":"Portfolio", "items": ['+dataFileLines.join(',')+']}'
    //     console.log(txt);
    //     fs.writeFileSync(data_portfolio, txt);     
    // });
}


const cmd = myArgs[0]
const site = './sites/' + myArgs[1]
const from = myArgs[2]

async function main (site, from){
    console.log(`-----------------------------------------`);
    console.log(`${site}: Iniciando montagem do site...`);
    console.log(`-----------------------------------------`);
    site_new_scaffold(site)
    
    console.log(`-----------------------------------------`);
    console.log(`${site}: navbar: Editado dados...`);
    console.log(`-----------------------------------------`);
    updateSiteData_navbar(site)

    console.log(`-----------------------------------------`);
    console.log(`${site}: mainheader: Atualizando imagem do avatar...`);
    console.log(`-----------------------------------------`);
    avatarImgUpdate(site, from)

    console.log(`-----------------------------------------`);
    console.log(`${site}: mainheader: Atualizando script...`);
    console.log(`-----------------------------------------`);
    updateSiteData_mainHeader(site, 'avatar.jpg')

    console.log(`-----------------------------------------`);
    console.log(`${site}: Corrigindo imagens (${from})...`)
    console.log(`-----------------------------------------`);
    await correctImageFileType(site, from)
    
    console.log(`-----------------------------------------`);
    console.log(`${site}: Iniciando cópia das imagens de (${from})...`)
    console.log(`-----------------------------------------`);
    await scaleToFitBatch(site, from)

    console.log(`-----------------------------------------`);
    console.log(`${site}: montando script do portfolio...`)
    console.log(`-----------------------------------------`);
    await portfolio_build_script(site)

    // console.log(`-----------------------------------------`);
    // console.log(`${site}: Iniciando compactação do pacote...`)
    // console.log(`-----------------------------------------`);
    // site_zip(site)

    // console.log(`-----------------------------------------`);
    // console.log(`${site}: Iniciando envio do pacote para o servidor...`)
    // console.log(`-----------------------------------------`);
    // site_upload( site + '.zip')
}

async function update (site){
    console.log(`-----------------------------------------`);
    console.log(`Iniciando compactação do pacote...`)
    console.log(`-----------------------------------------`);
    site_zip(site)

    console.log(`-----------------------------------------`);
    console.log(`Iniciando envio do pacote para o servidor...`)
    console.log(`-----------------------------------------`);
    site_upload( site + '.zip')
}

if (cmd == "new"){
    main(site, from)
}
if (cmd == "update"){
    update(site)
}

if (cmd == "init"){
    site_new_scaffold(site)
}

if (cmd == "correctImages"){
    correctImageFileType(site, from, portfolio_build_script)
}

if (cmd == "portfolio_pack"){
    scaleToFitBatch(site, from, portfolio_build_script)
}

if (cmd == "zip"){
    site_zip(site)
}

if (cmd == "upload"){
    console.log( site + '.zip');
    site_upload( site + '.zip')
}
console.log("----");