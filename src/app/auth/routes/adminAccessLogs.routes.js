const express = require("express");
const router = express.Router();
const paths = require("./paths/paths");
const AdminAccessLogsControllers = require("../controllers/adminAccessLogs.controllers");
const { authorize } = require("../../middlewares/authorize");
const validateInputs = require("../../middlewares/schema.validator");
const singleAdminLogsValidator = require("../../vallidators/getSingleAdminAccesLogs.validators");
const deleteAdminAccessLogsValidator = require("../../vallidators/delete.validator");
const getAllAdminAccessLogsValidator = require("../../vallidators/getAllAdminsAccessLogs.validator");

router.get(
  paths.getSingleAdminAccessLogs,
  authorize([
    "super",
    "admin",
    "support",
    "content-writer",
    "research-reviewer",
    "moderator",
    "account-view",
    "account-edit",
  ]),
  validateInputs(
    singleAdminLogsValidator.single_admin_logs_params_schema,
    "params"
  ),
  validateInputs(
    singleAdminLogsValidator.single_admin_logs_query_schema,
    "query"
  ),
  AdminAccessLogsControllers.getSingleAdminAccessLogs
);
router.get(
  paths.getAllAccessLogs,
  authorize(["super", "admin"]),
  validateInputs(getAllAdminAccessLogsValidator, "query"),
  AdminAccessLogsControllers.getAllAdminsAccessLogs
);

router.delete(
  paths.deletAdminAccessLogs,
  authorize(["super"]),
  validateInputs(deleteAdminAccessLogsValidator, "params"),
  AdminAccessLogsControllers.deleteAdminAccessLogs
);
module.exports = router;
