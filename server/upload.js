const util = require("util");
const multer = require("multer");
const maxSize = 20000 * 1024 * 1024;

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // cb(null, __basedir + "../client/src/assets/img/portfolio/");
    cb(null, "../client/src/assets/");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    // cb(null, file.fieldname + '-' + Date.now())
    cb(null, file.originalname);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;