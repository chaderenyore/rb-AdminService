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
const logout_schema = (login) => {
  schema = Joi.object().keys({
    username: Joi.string().trim().required(),
    session_id: Joi.string().required(),

  });
  return schema.validate(login, options);
};

module.exports = logout_schema;
