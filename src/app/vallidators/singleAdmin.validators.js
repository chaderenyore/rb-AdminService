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
const single_admin_schema = (id) => {
  schema = Joi.object()
    .keys({
      id: Joi.objectId().required(),
    });

  return schema.validate(id, options);
};
module.exports = single_admin_schema;
