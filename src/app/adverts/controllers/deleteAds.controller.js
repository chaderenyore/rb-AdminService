const AdvertsServices = require("../services/adverts.services");
const HTTP = require("../../../_helpers/httpStatusCodes");
const response = require("../../../_helpers/responseHandler").response;

exports.DeleteAds = async (req, res, next) => {
  try {
    // hash password if it was entered
    const deletedAdvert = await AdvertsServices.deleteAds(req.query.advert_type);
   if(deletedAdvert.status){
    const Data = {
      code: HTTP.OK,
      status: "success",
      message:"Advert Does Not Exist",
      data:deletedAdvert,
    };
    return response(res, Data);
   } else {
    const Data = {
      code: HTTP.OK,
      status: "success",
      message,
      data:deletedAdvert,
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
