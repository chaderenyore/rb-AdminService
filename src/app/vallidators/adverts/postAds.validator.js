const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

// ...
const options = {
  abortEarly: false,
  stripUnknown: true,
  errors: {
    wrap: {
      label: null
    }
  }
};

const postAdverts_schema = (advert) => {
    schema = Joi.object()
      .keys({
        advert_object: Joi.string().optional(),
        advert_type: Joi.string().optional().valid("top", "footer", "asset_ad", "community_ad"),
      });
  
    return schema.validate(advert, options);
  };
module.exports = postAdverts_schema;