const { Router } = require("express");
const Admins = require("./admin.routes");
const AdminPassword = require("./adminPassword.routes");
const AdminAccessLogs = require("./adminAccessLogs.routes");
const Adverts = require("./adverts.routes");




module.exports = () => {
  const router = Router();
  router.use("/", Admins);
  router.use("/", AdminPassword);
  router.use("/", AdminAccessLogs);
  router.use("/", Adverts);

  return router;
};
