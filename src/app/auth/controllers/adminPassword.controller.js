const debug = require("debug")("app:admin-controllers");
const Services = require("../services/adminPasswords.services");
const HTTP = require("../../../_helpers/httpStatusCodes");
const response = require("../../../_helpers/responseHandler").response;

exports.requestPasswordResetController = async (req, res, next) => {
    try {
        console.log(req.body)
      const { error, message, data } = await Services.requestPaswordReset(req.body.platform, req.body);
  
      if (error) {
        const Data = {
            code: HTTP.UNAUTHORIZED,
            status: "error",
            message,
            data
          };
          return response(res, Data);
      } else{
        const Data = {
            code: 200,
            status: "success",
            message,
            data
          };
         return response(res, Data)   
      }
    } catch (err) {
      // logger.error(err);
      const data = {
        code: HTTP.INTERNAL_SERVER,
        status: "error",
        message: error.message,
      };
      return response(res, data);
    }
  };
  exports.validatePasswordTokenController = async (req, res, next) => {
    try {
      const { error, message, data } = await Services.validatePasswordToken(req.body.platform, req.body);
  
      if (error) {
        const Data = {
            code: HTTP.UNAUTHORIZED,
            status: "error",
            message,
            data
          };
          return response(res, Data);
      } else{
        const Data = {
            code: 200,
            status: "success",
            message,
            data
          };
         return response(res, Data)   
      }
    } catch (err) {
      // logger.error(err);
      const data = {
        code: HTTP.INTERNAL_SERVER,
        status: "error",
        message: error.message,
      };
      return response(res, data);
    }
  };
  exports.resetPasswordController = async (req, res, next) => {
    try {
      const { error, message, data } = await Services.resetPassword(req.body);
  
      if (error) {
        const Data = {
            code: HTTP.UNAUTHORIZED,
            status: "error",
            message,
            data
          };
          return response(res, Data);
      } else{
        const Data = {
            code: HTTP.UNAUTHORIZED,
            status: "success",
            message,
            data
          };
         return response(res, Data)   
      }
    } catch (err) {
      // logger.error(err);
      const data = {
        code: HTTP.INTERNAL_SERVER,
        status: "error",
        message: error.message,
      };
      return response(res, data);
    }
  };

exports.changePasswordController = async (req, res, next) => {
    try {
      console.log("REQ USER ID", req.user.user_id)
      const { error, message, data } = await Services.changePassword(req.user.user_id, req.body);
  
      if (error) {
        const Data = {
            code: HTTP.UNAUTHORIZED,
            status: "error",
            message,
            data
          };
          return response(res, Data);
      } else{
        const Data = {
            code: HTTP.OK,
            status: "success",
            message,
            data
          };
         return response(res, Data)   
      }
    } catch (err) {
      // logger.error(err);
      const data = {
        code: HTTP.INTERNAL_SERVER,
        status: "error",
        message: error.message,
      };
      return response(res, data);
    }
  };


  
