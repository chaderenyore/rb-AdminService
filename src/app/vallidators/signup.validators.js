const Joi = require("joi");
const { ROLES } = require("../../_assets/role");
// ...

// ad_name can ve alpanumeric
const options = {
  abortEarly: false,
  stripUnknown: true,
  errors: {
    wrap: {
      label: null,
    },
  },
};
const validate_adminSignup_schema = (admin) => {
  schema = Joi.object().keys({
    email: Joi.string().email().trim().required(),
    password: Joi.string().required(),
    username: Joi.string().trim().required(),
    role: Joi.string()
      .trim()
      .valid(
        ROLES.SUPER_Admin,
        ROLES.ADMIN,
        ROLES.MODERATOR,
        ROLES.RESEARCH_REVIEWER,
        ROLES.ACCOUNT_EDIT,
        ROLES.ACCOUNT_VIEW,
        ROLES.CONTENT_WRITER,
      )
      .required(),
      can_write: Joi.string().required()
  });
  return schema.validate(admin, options);
};
module.exports = validate_adminSignup_schema;
