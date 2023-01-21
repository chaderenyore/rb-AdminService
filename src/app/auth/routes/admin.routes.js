const express = require("express");
const router = express.Router();
const paths = require("./paths/paths");
const AdminControllers = require("../controllers/admin.controllers");
const { authorize } = require("../../middlewares/authorize");
const validateInputs = require("../../middlewares/schema.validator");
const signUpAdminValidator = require("../../vallidators/signup.validators");
const loginAdminValidator = require("../../vallidators/login.validators");
const logoutAdminValidator = require("../../vallidators/logout.validators");
const validateTokenValidator = require("../../vallidators/token.validators");
const validateSingleAdmin = require("../../vallidators/singleAdmin.validators");

router.post(
  paths.signUp,
  authorize(["super"]),
  validateInputs(signUpAdminValidator, "body"),
  AdminControllers.registerAdmin
);
router.post(
  paths.login,
  validateInputs(loginAdminValidator, "body"),
  AdminControllers.loginAdmin
);

router.post(
  paths.logout,
  validateInputs(logoutAdminValidator, "body"),
  AdminControllers.logoutAdmin
);

router.get(
  paths.validateToken,
  authorize(["super", "admin", "editor", "reviewer"]),
  AdminControllers.validateToken
);
router.get(
  paths.getAllAdmins,
  authorize(["super", "admin", "editor", "reviewer"]),
  AdminControllers.getAllAdmins
);
router.get(
  paths.getSingleAdmin,
  authorize(["super", "admin", "editor", "reviewer"]),
  validateInputs(validateSingleAdmin, "params"),
  AdminControllers.getSingleAdmin
);

router.put(
  paths.changePassword,
  authorize(["super", "admin", "editor", "reviewer"]),
  validateInputs(validateSingleAdmin, "params"),
  AdminControllers.changePassword
);

router.delete(
  paths.deleteAdmin,
  authorize(["super"]),
  validateInputs(validateSingleAdmin, "params"),
  AdminControllers.deleteAdmin
);

module.exports = router;
