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
const request_reset_passsword_schema = (admin) => {
  schema = Joi.object()
    .keys({
      channel: Joi.string()
      .trim()
      .valid('email', 'phone_number')
      .required(),
    channel_value: Joi.string().trim().required(),
    platform: Joi.string().required().valid('web')
    });

  return schema.validate(admin, options);
};
module.exports = request_reset_passsword_schema;