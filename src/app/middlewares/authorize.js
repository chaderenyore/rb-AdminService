const axios = require("axios").default;
const HTTP = require("../../_helpers/httpStatusCodes");
const response = require("../../_helpers/responseHandler").response;
const createError = require("../../_helpers/createError");
const AdminServices = require("../auth/services/admin.service");
const VerifyJwt = require("../../_utils/jwt.utils").verifyJwt;

exports.authorize = (role = []) => {
  return async (req, res, next) => {
    const message = "Unauthorized";
    const token =
      req.headers["authorization"] &&
      req.headers["authorization"].split(" ")[1];
    if (!token) {
      const data = {
        code: HTTP.UNAUTHORIZED,
        status: "error",
        message: "UnAuthorized",
      };
      return response(res, data);
    }
    try {
      //   validate Admin
      const admin = await AdminServices.validateToken(token);
      if(admin && admin.data){
        if (
          role.includes(String(admin.data.admin_role)) ||
          role.includes(String(admin.admin.role) || role === ["all"])
        ) {
          req.token = token;
          req.user = admin.data;
          next();
        } else {
          const data = {
            code: HTTP.UNAUTHORIZED,
            status: "error",
            message: "UnAuthorize To View Resource",
          };
          return response(res, data);
        }
      } else {
        const data = {
          code: HTTP.UNAUTHORIZED,
          status: "error",
          message: admin.message,
        };
        return response(res, data);
      }
    } catch (err) {
      console.error(err);
      const data = {
        code: HTTP.UNAUTHORIZED,
        status: "error",
        message: "UnAuthorized",
      };
      return response(res, data);
    }
  };
};
