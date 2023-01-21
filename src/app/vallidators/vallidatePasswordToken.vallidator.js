const Joi = require("joi");

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
const validate_password_token = (token) => {
  schema = Joi.object()
    .keys({
      token: Joi.string().required(),
      channel_value: Joi.string().required(),
      platform: Joi.string().required()
    });

  return schema.validate(token, options);
};
module.exports = validate_password_token;





  