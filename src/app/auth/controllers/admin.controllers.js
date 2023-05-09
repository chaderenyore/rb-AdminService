const axios = require("axios");
const KEYS = require("../../../_config/keys");
const debug = require("debug")("app:admin-controllers");
const SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const AdminServices = require("../services/admin.service");
const AccessLogsServices = require("../services/adminAccessLogs.services");
const TokenServices = require("../services/token.services");
const VerifyJwt = require("../../../_utils/jwt.utils").verifyJwt;
const { roles } = require("../../../_assets/role");
const HTTP = require("../../../_helpers/httpStatusCodes");
const response = require("../../../_helpers/responseHandler").response;
const formatCreatAdminRes =
  require("../../../_helpers/responseFormatter").formatCreateAdminResponse;
const formatLoginRes =
  require("../../../_helpers/responseFormatter").formatLoginResponse;
const formatGetAllAdminsRes =
  require("../../../_helpers/responseFormatter").formatGetAllAdminRespnse;

async function registerAdmin(req, res, next) {
  try {
    // save password to send to admin via mail
    let mailPasword = req.body.password;
    // check if its super admin role
    if (req.body.role === "super") {
      const data = {
        code: HTTP.UNAUTHORIZED,
        status: "error",
        message: "Super Admin cannot be created",
      };
      return response(res, data);
    }
    // validate role
    if (!roles.includes(req.body.role)) {
      const data = {
        code: HTTP.BAD_REQUEST,
        status: "error",
        message: "This role is not Permitted",
      };
      return response(res, data);
    }
    //   check if Admin exists
    if (await AdminServices.checkExisting(req.body.email, req.body.username)) {
      const data = {
        code: HTTP.BAD_REQUEST,
        status: "error",
        message: `Admin with email or username already exist`,
        data: null,
      };
      return await response(res, data);
    } else {
      // hash password
      try {
        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(req.body.password, salt);
        // set image to url form s3
        if (req.body.image) {
          req.body.image = req.file.location;
        }
        // set hash to requets body pasword
        req.body.password = hash;
        console.log("SUPER ADMIN ============ ", req.user);
        const dataToCreateAdmin = {
          added_by_username: req.user.username,
          added_by_email: req.user.email,
          ...req.body,
        };
        console.log(dataToCreateAdmin);
        const admin = await AdminServices.createAdmin(dataToCreateAdmin);
        console.log("NEW ADMIN ================== ", admin);
        // Send notification mail to Admin Created
        const DataToMail = {
          email: req.body.email,
          newAdminUsername: req.body.username,
          role: req.body.role,
          password: mailPasword,
          adminUrl: KEYS.ADMIN_DASHBOARD_URL,
          loginUrl: KEYS.ADMIN_LOGIN_URL,
        };
        const mail = await axios.post(
          `${KEYS.NOTIFICATION_SERVICE_URI}/notifications/v1/admin/new-admin`,
          DataToMail,
          {
            headers: {
              Authorization: `Bearer ${req.token}`,
            },
          }
        );
        const data = await formatCreatAdminRes(admin);
        const Data = {
          code: HTTP.OK,
          status: "success",
          message: "Admin Created",
          data,
        };
        return response(res, Data);
      } catch (error) {
        const data = {
          code: HTTP.INTERNAL_SERVER,
          status: "error",
          message: error.message,
        };
        return response(res, data);
      }
    }
  } catch (error) {
    const data = {
      code: HTTP.INTERNAL_SERVER,
      status: "error",
      message: error.message,
    };
    return response(res, data);
  }
}

async function loginAdmin(req, res, next) {
  try {
    let tokenDataForNewAdmin;
    let username = req.body.username;
    let password = req.body.password;
    // ?check if admin exists
    const admin = await AdminServices.authenticate(username);
    if (!admin) {
      const data = {
        code: HTTP.BAD_REQUEST,
        status: "error",
        message: `Admin with username: ${req.body.username} doesnt exists`,
        data: null,
      };
      return await response(res, data);
    } else {
      // check if token is active
      const isLoggedIn = await TokenServices.findARecord({
        username: username,
      });
      if (isLoggedIn && isLoggedIn.isActive === true) {
        const data = {
          code: HTTP.BAD_REQUEST,
          status: "error",
          message: `You're Loggged In Another Device`,
          data: null,
        };
        return await response(res, data);
      } else if (isLoggedIn && isLoggedIn.isActive === false) {
        // ?compare password
        const result = await bcrypt.compare(password, admin.password);
        if (result) {
          // update token record for old users
          const body = { _id: admin._id, role: admin.role };
          const token = jwt.sign({ admin: body }, process.env.JWT_SECRET);
          const tokenData = {
            token,
            username,
            isActive: true,
          };
          const UpdateTokenRecord = await TokenServices.updateToken(
            req.body.username,
            tokenData
          );
          console.log("UODATED TOKEN ====== ", UpdateTokenRecord);
          //  Set login time
          admin.updated_at = Date.now();
          // generate session id
          const now = Date.now();
          const session = {
            loggedInTime: now,
            user_id: admin._id,
          };
          const session_id = jwt.sign({ session }, process.env.JWT_SECRET);
          // push login time to access logs
          // data to access logs
          let logsData = {
            session_id,
            admin_id: String(admin._id),
            email: String(admin.email),
            is_active: true,
            lat: req.body.lat || null,
            long: req.body.long || null,
            logged_in_time: now,
            role: String(admin.role),
          };
          const adminAccessLogs = await AccessLogsServices.createLogs(logsData);
          // format response
          const data = await formatLoginRes(admin);
          data.session_id = session_id;
          data.access_token = token;

          //Send back the token to the user
          const Data = {
            code: HTTP.OK,
            status: "success",
            message: "Login Successful",
            data,
          };
          return response(res, Data);
        } else {
          const data = {
            code: HTTP.UNAUTHORIZED,
            status: "error",
            message: "password/Email incorrect",
            data: null,
          };
          return response(res, data);
        }
      } else {
        const result = await bcrypt.compare(password, admin.password);
        if (result) {
          const body = { _id: admin._id, role: admin.role };
          const token = jwt.sign({ admin: body }, process.env.JWT_SECRET);
          // Create Token Record For first time users
          tokenDataForNewAdmin = {
            token,
            username,
            isActive: true,
          };
          const newTokenRecord = await TokenServices.createToken(
            tokenDataForNewAdmin
          );
          console.log("TOKEN ===== ", newTokenRecord);

          if (admin.role !== "super") {
            // send login alert to super/admin for new loged in
            const DataToMail = {
              email: admin.added_by_email,
              adminUsername: admin.added_by_username,
              role: admin.role,
              newAdminUsername: username,
              newAdminEmail: admin.email,
            };
            const mail = await axios.post(
              `${KEYS.NOTIFICATION_SERVICE_URI}/notifications/v1/admin/admin-loggedin`,
              DataToMail
            );
            // send welcome mail
            const DataToNewAdminWelcomeMail = {
              email: admin.email,
              adminUsername: admin.username,
              role: admin.role,
              newAdminUsername: username,
              newAdminEmail: admin.email,
            };
            const welcomeMail = await axios.post(
              `${KEYS.NOTIFICATION_SERVICE_URI}/notifications/v1/admin/welcome-mail`,
              DataToNewAdminWelcomeMail,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
          }
          // generate session id
          const now = Date.now();
          const session = {
            loggedInTime: now,
            user_id: admin._id,
          };
          const session_id = jwt.sign({ session }, process.env.JWT_SECRET);
          // push login time to access logs
          // data to access logs
          let logsData = {
            session_id,
            admin_id: String(admin._id),
            email: String(admin.email),
            is_active: true,
            lat: req.body.lat || null,
            long: req.body.long || null,
            logged_in_time: now,
            role: String(admin.role),
          };
          const adminAccessLogs = await AccessLogsServices.createLogs(logsData);
          // format response
          const data = await formatLoginRes(admin);
          data.session_id = session_id;
          data.access_token = token;

          //Send back the token to the user
          const Data = {
            code: HTTP.OK,
            status: "success",
            message: "Login Successful",
            data,
          };
          return response(res, Data);
        } else {
          const data = {
            code: HTTP.UNAUTHORIZED,
            status: "error",
            message: "password/Email incorrect",
            data: null,
          };
          return response(res, data);
        }
      }
    }
  } catch (error) {
    console.log(error);
    const data = {
      code: HTTP.INTERNAL_SERVER,
      status: "error",
      message: error.message,
    };
    return response(res, data);
  }
}

async function logoutAdmin(req, res, next) {
  try {
    // store tokendata
    let tokenData;
    //  check if session id is expired
    const session = await AccessLogsServices.findARecord({
      session_id: req.body.session_id,
    });
    console.log("SESSION +=====================", session);
    if (!session) {
      const Data = {
        code: 200,
        status: "error",
        message: `Invalid/Expired Session`,
        data: {},
      };
      return await response(res, Data);
    }
    // console.log(req.body.session_id === session.session_id);
    if (session && session.is_active === false) {
      const Data = {
        code: 200,
        status: "error",
        message: `Invalid/Expired Session`,
        data: {},
      };
      return await response(res, Data);
    }
    //  check if admin has logged out initially
    const isAdmin = await TokenServices.findARecord({
      username: req.body.username,
    });
    if (isAdmin && isAdmin.isActive === false) {
      const Data = {
        code: 400,
        status: "error",
        message: `Admin has Already Logged Out`,
        data: {},
      };
      return await response(res, Data);
    }
    //   check if Admin exists
    const body = { isActive: false };
    const admin = await TokenServices.updateToken(req.body.username, body);
    if (!admin) {
      // create token record
      tokenData = {
        token: "",
        username: req.body.username,
        isActive: false,
      };
      const newTokenRecord = await TokenServices.createToken(tokenData);
    }
    // data to access logs
    const logsData = {
      session_id: req.body.session_id,
      lat: req.body.lat || "",
      long: req.body.long || "",
      is_active: false,
      logged_out_time: Date.now(),
      login_duration: session ? Date.now() - session.logged_in_time : "",
    };
    const adminAccessLogs = await AccessLogsServices.updateLogs(
      req.body.session_id,
      logsData
    );
    const Data = {
      code: 200,
      status: "success",
      message: `You are logged Out`,
      data: {
        admin,
        session_id: req.body.session_id || null,
      },
    };
    return await response(res, Data);
  } catch (error) {
    const data = {
      code: HTTP.INTERNAL_SERVER,
      status: "error",
      message: error.message,
    };
    return response(res, data);
  }
}

async function getSingleAdmin(req, res, next) {
  try {
    const admin = await AdminServices.getAdminById(req.params.id);
    debug(admin);

    //   check if Admin exists
    if (admin === null) {
      const data = {
        code: HTTP.NOT_FOUND,
        status: "error",
        message: `Admin not found`,
        data: null,
      };
      return await response(res, data);
    } else {
      // format response
      const Data = {
        code: 200,
        status: "success",
        message: `Admin with username ${admin.username} retrieved`,
        data: admin,
      };
      const resMessage = await response(res, Data);
      return resMessage;
    }
  } catch (error) {
    const data = {
      code: HTTP.INTERNAL_SERVER,
      status: "error",
      message: error.message,
    };
    return response(res, data);
  }
}

async function getAdminProfile(req, res, next) {
  try {
    const data = {
      _id: req.user.admin_id,
    };
    const admin = await AdminServices.getAnAdmin(data);
    debug(admin);

    //   check if Admin exists
    if (!admin) {
      const data = {
        code: HTTP.OK,
        status: "error",
        message: `Admin not found`,
        data: null,
      };
      return await response(res, data);
    } else {
      // format response
      const Data = {
        code: 200,
        status: "success",
        message: `Admin Profile Retrieved`,
        data: admin,
      };
      const resMessage = await response(res, Data);
      return resMessage;
    }
  } catch (error) {
    const data = {
      code: HTTP.INTERNAL_SERVER,
      status: "error",
      message: error.message,
    };
    return response(res, data);
  }
}
async function deleteAdmin(req, res, next) {
  try {
    // check role of super admin
    console.log(req.params.id);
    const isAdmin = await AdminServices.getAdminById(String(req.params.id));
    console.log("ADMIN ========== : ", isAdmin);
    //   check if Admin exists
    if (!isAdmin) {
      const data = {
        code: HTTP.OK,
        status: "error",
        message: `Admin not found`,
        data: null,
      };
      return await response(res, data);
    } else {
      if (isAdmin && isAdmin.role === "super") {
        const data = {
          code: HTTP.UNAUTHORIZED,
          status: "error",
          message: `Super Admin Cannot Be deleted`,
          data: null,
        };
        return await response(res, data);
      }
      await AdminServices.deleteAdmin(req.params.id);
      // format response
      const Data = {
        code: 200,
        status: "success",
        message: `Admin with id ${req.params.id} deleted`,
        data: null,
      };
      const resMessage = await response(res, Data);
      return resMessage;
    }
  } catch (error) {
    const data = {
      code: HTTP.INTERNAL_SERVER,
      status: "error",
      message: error.message,
    };
    return response(res, data);
  }
}

async function getAllAdmins(req, res, next) {
  try {
    const admins = await AdminServices.getAllAdmins();
    // format response
    const data = await formatGetAllAdminsRes(admins);

    const Data = {
      code: 200,
      status: "success",
      message: "All Admin retrieved",
      data,
    };
    const resMessage = await response(res, Data);
    return resMessage;
  } catch (error) {
    const data = {
      code: HTTP.INTERNAL_SERVER,
      status: "error",
      message: error.message,
    };
    return response(res, data);
  }
}

async function validateToken(req, res, next) {
  try {
    const { error, message, data } = await AdminServices.validateToken(
      req.token
    );

    if (error) {
      const ErrData = {
        code: 401,
        status: "error",
        message,
        data: null,
      };
      return response(res, ErrData);
    } else {
      const Data = {
        code: 200,
        status: "success",
        message,
        data,
      };
      return response(res, Data);
    }
  } catch (err) {
    const data = {
      code: HTTP.INTERNAL_SERVER,
      status: "error",
      message: err.message,
    };
    return response(res, data);
  }
}

async function changePassword(req, res, next) {
  try {
    // checkif Admin exist
    const admin = await AdminServices.getAdminById(req.params.id);
    if (!!!admin) {
      const data = {
        code: HTTP.OK,
        status: "error",
        message: `Admin not found`,
        data: null,
      };
      return await response(res, data);
    } else {
      if (String(admin._id) !== String(req.user.admin_id)) {
        const data = {
          code: HTTP.OK,
          status: "error",
          message: `You Are Attempting to Change ANother Admins Password`,
          data: null,
        };
        return await response(res, data);
      }
      if (admin.role === "super") {
        const data = {
          code: HTTP.OK,
          status: "error",
          message: `Cannot Change the Password of A Super Admin`,
          data: null,
        };
        return await response(res, data);
      } else {
        // hash password if it was entered
        const { error, message, data } = await AdminServices.changePassword(
          req.params.id,
          req.body
        );
        if (error) {
          const Data = {
            code: HTTP.OK,
            status: "error",
            message,
            data,
          };
          return response(res, Data);
        } else {
          debug(data);
          const resData = await formatCreatAdminRes(data);
          debug(resData);
          const Data = {
            code: 200,
            status: "success",
            message: `${admin.username} your password was updated successfully`,
            data,
          };
          const resMessage = await response(res, Data);
          return resMessage;
        }
      }
    }
  } catch (err) {
    const data = {
      code: HTTP.INTERNAL_SERVER,
      status: "error",
      message: err.message,
    };
    return response(res, data);
  }
}

module.exports = {
  registerAdmin,
  loginAdmin,
  getAllAdmins,
  getSingleAdmin,
  changePassword,
  deleteAdmin,
  validateToken,
  logoutAdmin,
  getAdminProfile,
};
