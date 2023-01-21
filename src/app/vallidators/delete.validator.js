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
const delete_schema = (id) => {
  schema = Joi.object()
    .keys({
        id: Joi.objectId().required(),
    });

  return schema.validate(id, options);
};

module.exports =  delete_schema;
