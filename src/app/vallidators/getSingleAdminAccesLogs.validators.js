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
const single_admin_logs_query_schema = (id) => {
  schema = Joi.object()
    .keys({
    page: Joi.number().positive().optional(),
    limit: Joi.number().positive().optional(),
    });

  return schema.validate(id, options);
};

const single_admin_logs_params_schema = (id) => {
    schema = Joi.object()
      .keys({
        admin_id: Joi.string().required(),
      });
  
    return schema.validate(id, options);
  };
module.exports = {single_admin_logs_query_schema, single_admin_logs_params_schema}

