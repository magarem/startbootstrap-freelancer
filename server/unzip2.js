const extract = require('extract-zip')
const path = require('path');
var myArgs = process.argv.slice(2);
console.log('myArgs: ', myArgs);

async function unzip (file) {
  try {
    var target = path.join(__dirname) + '/../client/src/assets/img/portfolio/'
    await extract('../client/src/assets/img/portfolio/' + file, { dir: target})
    console.log('Extraction complete')
  } catch (err) {
      console.log(err);
    // handle any errors
  }
}
unzip(myArgs[0])