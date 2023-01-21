module.exports = {
  // Admin Auth
  login: "/login",
  logout: "/logout",
  validateToken: "/validate-token",
  changePassword: "/change-password/:id",
  // superAdmin
  signUp: "/signup",
  deleteAdmin: "/delete-admin/:id",
  getSingleAdmin: "/get-single-admin/:id",
  getAllAdmins: "/all",


    // admin password routes
  requestReset: "/request-reset",
  validatePassowrdToken: "/validate-password-token",
  resetPasword: "/reset-password",

    // admin access Logs routes
  getSingleAdminAccessLogs: "/logs/:admin_id",
  deletAdminAccessLogs: "/admin-logs",
  getAllAccessLogs: "/admin-logs",
  };
  
