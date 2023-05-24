const AdvertsServices = require("../services/adverts.services");
const HTTP = require("../../../_helpers/httpStatusCodes");
const response = require("../../../_helpers/responseHandler").response;
const createError = require("../../../_helpers/createError");


exports.PostAds =  async(req, res, next) => {
  try {
    // checkif Admin exist
    const advert = await AdvertsServices.create(req.body);
      const data = {
        code: HTTP.OK,
        status: "success",
        message: `Advert Posted`,
        data: advert,
      };
      return await response(res, data);
  } catch (err) {
    const data = {
      code: HTTP.INTERNAL_SERVER,
      status: "error",
      message: err.message,
    };
    return response(res, data);
  }
}
