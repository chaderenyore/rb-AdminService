const AdvertsServices = require("../services/adverts.services");
const HTTP = require("../../../_helpers/httpStatusCodes");
const response = require("../../../_helpers/responseHandler").response;


exports.ViewAds =  async(req, res, next) => {
  try {
    const advert = await AdvertsServices.viewAds(
      {advert_type: req.query.advert_type}
    );
      const Data = {
        code: HTTP.OK,
        status: "success",
        message: "Adverts fetched",
        data: advert,
      };
      return response(res, Data);
  } catch (err) {
    const data = {
      code: HTTP.INTERNAL_SERVER,
      status: "error",
      message: err.message,
    };
    return response(res, data);
  }
}
