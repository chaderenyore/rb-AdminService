const AdvertsServices = require("../services/adverts.services");
const HTTP = require("../../../_helpers/httpStatusCodes");
const response = require("../../../_helpers/responseHandler").response;
const createError = require("../../../_helpers/createError");


exports.PostAds =  async(req, res, next) => {
  try {
    const { advert_type, advert_object } = req.body;
    // checkif Advert exist
    const advertExist = await AdvertsServices.viewAds({advert_type: advert_type})
   if(advertExist){
    // update
    const updateAds = await AdvertsServices.update({advert_type: adevrt_type}, {...req.body});
          const data = {
        code: HTTP.OK,
        status: "success",
        message: `Advert Updated`,
        data: updateAds,
      };
      return await response(res, data);
   } else{
   
    const dataToModel = {
      admin_id: req.user._id,
      admin_username: req.user.username,
      is_active: true,
      ...req.body
    }
    const advert = await AdvertsServices.create(dataToModel);
      const data = {
        code: HTTP.OK,
        status: "success",
        message: `Advert Posted`,
        data: advert,
      };
      return await response(res, data);
   }
  } catch (err) {
    const data = {
      code: HTTP.INTERNAL_SERVER,
      status: "error",
      message: err.message,
    };
    return response(res, data);
  }
}
