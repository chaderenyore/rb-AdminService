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

const all_admin_access_logs_schema = (admin) => {
    schema = Joi.object()
      .keys({
        page: Joi.number().positive().optional(),
        limit: Joi.number().positive().optional(),
        type: Joi.string().optional()
      });
  
    return schema.validate(admin, options);
  };
module.exports = all_admin_access_logs_schema;