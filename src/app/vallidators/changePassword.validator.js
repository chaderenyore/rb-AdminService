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
const changePassword_schema = (password) => {
  schema = Joi.object()
    .keys({
        new_password: Joi.string().required(),
        old_password: Joi.string().required(),
    });

  return schema.validate(password, options);
};

module.exports =  changePassword_schema;
