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
const reset_passsword_schema = (admin) => {
  schema = Joi.object()
    .keys({
      channel: Joi.string()
      .trim()
      .valid('email', 'phone_number')
      .required(),
    channel_value: Joi.string().trim().required(),
    key: Joi.string().required(),
    new_password: Joi.string().required(),
    });

  return schema.validate(admin, options);
};
module.exports = reset_passsword_schema;