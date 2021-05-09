const express = require('express');
const app = express();
// app.use(express.static('sites'));

const port = 3000;
const path = require('path');
const fs = require('fs');
var zipper = require('zip-local');
const extract = require('extract-zip')

var multer  = require('multer')
// var upload = multer({ dest: 'uploads/' })

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/src/assets/")
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage })

async function unzip (file, target) {
  try {
    await extract(target + file, { dir: target + '/'+ file.split('.')[0]})
    console.log('Extraction complete')
  } catch (err) {
      console.log(err);
    // handle any errors
  }
}

app.post('/upload', upload.single('file'), function (req, res, next) {
  console.log(req.file.originalname.split('.')[0]);
  unzip(req.file.originalname, '/Users/marcelo/desenv/startbootstrap-freelancer/client/src/assets/')
  res.status(200).send({
    message: "Uploaded the file successfully: "// + req.file.originalname,
  });
})

app.post('/upload_', async (req, res) => {
  try {
    console.log('---req:', req.file);
    console.log('req.file.originalname:', req.file.originalname);
    await uploadFile(req, res);

    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }
  
    // unzip(req.file.originalname, '/Users/marcelo/desenv/startbootstrap-freelancer/client/src/assets/')
    res.status(200).send({
      message: "Uploaded the file successfully: "// + req.file.originalname,
    });
  } catch (err) {
    res.status(500).send({
      // message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
})



app.get('/api/dataload/:site/:id', (req, res) => {
    console.log(req.params);
    fs.readFile(`./sites/${req.params.site}/data/${req.params.id}.json`, {encoding: 'utf-8'}, function(err, data){
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

app.use('/public', express.static('public'));
app.use('/api/sites', express.static('sites'));

app.get('/:site', (req,res) => {
  // res.sendFile(path.join(__dirname, '../client/build/index.html'));
  console.log(__dirname);
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));