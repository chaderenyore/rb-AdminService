module.exports = {
  // Admin Auth
  login: "/login",
  logout: "/logout",
  validateToken: "/validate-token",
  changePassword: "/change-password/:id",
  // superAdmin
  signUp: "/signup",
  deleteAdmin: "/delete-admin/:id",
  getSingleAdmin: "/single-admin/:id",
  getAdminProfile: "/admin-profile",
  getAllAdmins: "/all",

  // others

  uploadImage: "/image",


    // admin password routes
  requestReset: "/request-reset",
  validatePassowrdToken: "/validate-password-token",
  resetPasword: "/reset-password",

    // admin access Logs routes
  getSingleAdminAccessLogs: "/logs/:admin_id",
  deletAdminAccessLogs: "/admin-logs",
  getAllAccessLogs: "/admin-logs",
  };
  
