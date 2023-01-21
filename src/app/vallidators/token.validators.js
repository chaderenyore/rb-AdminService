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
const validate_token = (token) => {
  schema = Joi.object()
    .keys({
      token: Joi.string().trim().required()
    });

  return schema.validate(token, options);
};
module.exports = validate_token;
