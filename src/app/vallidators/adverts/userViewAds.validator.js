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

const viewAdverts_schema = (advert) => {
    schema = Joi.object()
      .keys({
        advert_type: Joi.string().required().valid("top", "footer", "asset_ad", "community_ad"),
      });
  
    return schema.validate(advert, options);
  };
module.exports = viewAdverts_schema;