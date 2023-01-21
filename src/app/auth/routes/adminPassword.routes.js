const express = require("express");
const router = express.Router();
const paths = require("./paths/paths");
const AdminPasswordControllers = require("../controllers/adminPassword.controller");
const { authorize } = require("../../middlewares/authorize");
const validateInputs = require("../../middlewares/schema.validator");
const requestResetValidator = require("../../vallidators/requestResetPassword");
const resetPasswordValidator = require("../../vallidators/resetPassword.vallidator");
const validatePassowordTokenValidator = require("../../vallidators/vallidatePasswordToken.vallidator");


router.post(
  paths.requestReset,
  validateInputs(requestResetValidator, "body"),
  AdminPasswordControllers.requestPasswordResetController
);
router.post(
  paths.resetPasword,
  validateInputs(resetPasswordValidator, "body"),
  AdminPasswordControllers.resetPasswordController
);

router.post(
  paths.validatePassowrdToken,
  validateInputs(validatePassowordTokenValidator, "body"),
  AdminPasswordControllers.validatePasswordTokenController
);


module.exports = router;
