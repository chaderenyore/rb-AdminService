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

const all_adverts_schema = (admin) => {
    schema = Joi.object()
      .keys({
        page: Joi.number().positive().optional(),
        limit: Joi.number().positive().optional(),
      });
  
    return schema.validate(admin, options);
  };
module.exports = all_adverts_schema;