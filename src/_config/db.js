const debug = require("debug")("app:db");
const mongoose = require("mongoose");

const HTTP = require("../_helpers/httpStatusCodes");
const response = require("../_helpers/responseHandler").response;

const MONGO_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// define a global connection
let connection;
module.exports.createConnection = async function () {
  // db connection to use for test environment
  if (process.env.NODE_ENV === "test") {
    try {
      connection = await mongoose.connect(
        process.env.ADMIN_TEST,
        MONGO_OPTIONS
      );
      console.log("Test Database connectted");
      
    } catch (error) {
      debug(error);
      throw error
    }
  } else {
    //db  connection for development || production
    try {
      connection = await mongoose.connect(
        process.env.MONGODBURI,
        MONGO_OPTIONS
      );
      console.log("Prod Database connectted");
    } catch (error) {
     console.log(error)
    }
  }
};
