const HTTP = require("../../../_helpers/httpStatusCodes");
const response = require("../../../_helpers/responseHandler").response;
const AdminServices = require("../services/admin.service");

exports.updateProfilePicture = async (req, res, next) => {
  try {
    if (!req.file) {
      const data = {
        code: HTTP.UPROCCESSIBLE,
        status: "error",
        message: "Please specify a file to upload",
        data: null,
      };
      return await response(res, data);
    } else {
      const update = {
        image: req.file?.location,
      };
      const filter = {
        _id: req.user._id,
      };
      const admin = await AdminServices.update(filter, update);
      const Data = {
        code: 200,
        status: "success",
        message: "Profile Picture Updated",
        data: admin,
      };
      return response(res, Data);
    }
  } catch (err) {
    logger.error(err);
    return next(createError.InternalServerError(err));
  }
};
