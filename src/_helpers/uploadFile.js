var aws = require("aws-sdk");
var multer = require("multer");
const dotenv = require("dotenv");
var multerS3 = require("multer-s3");
const randomstring = require("randomstring");
dotenv.config();
const KEYS = require("../_config/keys");


function defaultFunction(directory) {
  const s3 = new aws.S3({
    region:"us-east-1",
    accessKeyId:KEYS.AWS_ACCESS_KEY,
    secretAccessKey: KEYS.AWS_SECRET_ACCESS_KEY,
  });

  const extensions = ["jpeg", "jpg", "png", "tiff", "mp4"];

  const fileFilter = (req, file, cb) => {
    if (extensions.includes(file.mimetype.split("/")[1])) {
      cb(null, true);
    } else {
      cb(new Error(`File type should any of: ${extensions.join(", ")}`), false); // if validation failed then generate error
    }
  };

  var upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: "researchbuddy-media",
      acl: 'private',
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        let r = randomstring.generate(19);
        let timestamp = Date.now();
        var path = `${directory}/${timestamp}-${r}.${extension}`;
        cb(null, path);
      },
    }),
    fileFilter: fileFilter,
  });
  return upload;
}

const deleteFile = (ID, SECRET, files) => {
  const s3 = new aws.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET,
  });
  const params = {
    Bucket: "researchbuddy-test",
    Delete: {
      Objects: files,
    },
    /*
       where value for 'Key' equals 'pathName1/pathName2/.../pathNameN/fileName.ext'
       - full path name to your file without '/' at the beginning
    */
  };
  return s3.deleteObjects(params, function (err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else console.log(data); // successful response
  });
};
const uploadFile = (module.exports = defaultFunction);
uploadFile.deleteFile = deleteFile;
