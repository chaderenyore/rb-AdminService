const AdvertsServices = require("../services/adverts.services");
const HTTP = require("../../../_helpers/httpStatusCodes");
const response = require("../../../_helpers/responseHandler").response;

exports.fetchAllAds = async (req, res, next) => {
  try {
   
    const adverts = await AdvertsServices.fetchAllAds(
      req.query.limit,
      req.query.page,
    );
    if (adverts.data.length === 0) {
      const data = {
        code: HTTP.OK,
        status: "success",
        message: `No Adverts Found`,
        data: {},
      };
      return await response(res, data);
    } else {
      const Data = {
        code: HTTP.OK,
        status: "success",
        message: "Adverts fetched",
        data: adverts,
      };
      return response(res, Data);
    }
  } catch (err) {
    const data = {
      code: HTTP.INTERNAL_SERVER,
      status: "error",
      message: err.message,
    };
    return response(res, data);
  }
};
