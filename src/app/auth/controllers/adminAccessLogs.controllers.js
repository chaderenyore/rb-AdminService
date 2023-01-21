const debug = require("debug")("app:adminLogs-controllers");
const AccessLogsServices = require("../services/adminAccessLogs.services");
const HTTP = require("../../../_helpers/httpStatusCodes");
const response = require("../../../_helpers/responseHandler").response;



async function getSingleAdminAccessLogs(req, res, next){
  try {
    const accesssLogs = await AccessLogsServices.findAll(req.query.limit, req.query.page,{admin_id:req.params.admin_id});
    debug(accesssLogs)
      //   check if Admin exists
      if (accesssLogs.data.length === 0) {
        const data = {
          code: HTTP.NOT_FOUND,
          status: "error",
          message: `No Logs Found For This Admin`,
          data: null,
        };
        return await response(res, data);
      } else {
        // format response
       const Data = {
         code: 200,
         status: "success",
         message: `Admin Access Logs retrieved`,
         data: accesssLogs,
       };
       const resMessage = await response(res, Data);
       return resMessage;
      }
   
  } catch (error) {
    const data = {
      code: HTTP.INTERNAL_SERVER,
      status: "error",
      message: error.message,
    };
    return response(res, data);
  }
}
async function deleteAdminAccessLogs(req, res, next){
  try {
       
      //   check if Admin exists
      if (await !!!AccessLogsServices.findARecord(req.query)) {
        const data = {
          code: HTTP.NOT_FOUND,
          status: "error",
          message: `Admin Logs  not found`,
          data: null,
        };
        return await response(res, data);
      } else {
         await AccessLogsServices.deleteRecords(req.params);
        // format response
       const Data = {
         code: 200,
         status: "success",
         message: `Admin Logs deleted`,
         data: null,
       };
       const resMessage = await response(res, Data);
       return resMessage;
      }
   
  } catch (error) {
    const data = {
      code: HTTP.INTERNAL_SERVER,
      status: "error",
      message: error.message,
    };
    return response(res, data);
  }
}

async function getAllAdminsAccessLogs(req, res, next){
    try {
      const adminsAccessLogs = await AccessLogsServices.findAll(req.query.limit, req.query.page, {});
     
      const Data = {
        code: 200,
        status: "success",
        message: "All Admin Logs retrieved",
        data: adminsAccessLogs,
      };
      const resMessage = await response(res, Data);
      return resMessage;
    } catch (error) {
      const data = {
        code: HTTP.INTERNAL_SERVER,
        status: "error",
        message: error.message,
      };
      return response(res, data);
    }
}




module.exports = {
  getSingleAdminAccessLogs,
  deleteAdminAccessLogs,
  getAllAdminsAccessLogs,
};
