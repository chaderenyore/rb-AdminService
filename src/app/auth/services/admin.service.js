const debug = require("debug")("app:admin-services");
const { Admin } = require("../models");
const bcrypt = require("bcrypt");
const VerifyJwt = require("../../../_utils/jwt.utils").verifyJwt;

async function createAdmin(bodyObj) {
  const { username, email, password, image, role, status, can_write } = bodyObj;
  return await Admin.create({
    username,
    email,
    password,
    image,
    role,
    status,
    can_write,
  });
}

async function changePassword(id, data) {
  try {
    data.password = bcrypt.hashSync(req.body.password, 10);
    const admin = await Admin.findOneAndUpdate(
      { _id: id },
      { password: data.password },
      { new: true }
    );

    return admin;
  } catch (error) {
    return {
      error: true,
      message: "Error Resetting Password",
      data: error,
    };
  }
}

async function deleteAdmin(id) {
  return await Admin.findByIdAndRemove(id);
}

async function checkExisting(email, username) {
  return await Admin.findOne({
    $or: [{ email: email }, { username: username }],
  });
}

async function authenticate(username) {
  return await Admin.findOne({ username: username });
}
async function getAllAdmins() {
  return await Admin.find({}).select('-password');
}

async function validateToken(token) {
  try {
    const adminPayload = VerifyJwt(token);
    console.log("AdminPayload: ", adminPayload);
    if (adminPayload) {
      const admin = await Admin.findOne({ _id: adminPayload.admin._id });
      return {
        error: !admin,
        message: !admin ? "Expired token" : "Token is valid",
        data: {
          status: !!admin,
          admin_id: admin._id,
          admin_role: admin.role,
          username: admin.username,
          email: admin.email,
        },
      };
    } else {
      return {
        error: true,
        message: "Invalid Token",
        data: null,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      error: true,
      message: "Invalid token passed.",
      data: error,
    };
  }
}

async function getAdminById(id) {
  try {
    return await Admin.findById(id).select("-password");
  } catch (error) {
    return {
      error: true,
      message: "Error retrieving admin",
      data: error,
    };
  }
}
module.exports = {
  createAdmin,
  authenticate,
  checkExisting,
  getAllAdmins,
  getAdminById,
  validateToken,
  changePassword,
  deleteAdmin,
};
