const Joi = require("joi");

// ...
const options = {
  abortEarly: false,
  stripUnknown: true,
  errors: {
    wrap: {
      label: null,
    },
  },
};
const login_schema = (login) => {
  schema = Joi.object().keys({
    username: Joi.string().trim().required(),
    password: Joi.string().required(),
    lat: Joi.number().optional(),
    long: Joi.number().optional()
  });
  return schema.validate(login, options);
};

module.exports = login_schema;
